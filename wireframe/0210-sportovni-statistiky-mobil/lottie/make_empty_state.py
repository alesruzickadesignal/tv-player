"""Generátor Lottie animace prázdného průběhu (hřiště, míč na středu, vlnky, dva hráči).
Hodnoty odpovídají CSS v ../style.css (.eill …). Spuštění: python3 make_empty_state.py → empty-state.json"""
import json, re, os

FPS, DUR = 60, 9.6                      # 9,6 s = nejmenší společný násobek 1,2 / 2,4 / 3,2 s → bezešvá smyčka
OP = round(FPS * DUR)                   # 576 snímků
W, H = 176, 104
BRAND, ERROR = [1/255, 163/255, 254/255], [240/255, 68/255, 56/255]
EASE_IO = ({'x': [.5], 'y': [0]}, {'x': [.5], 'y': [1]})      # cubic-bezier(.5,0,.5,1)
EASE_SW = ({'x': [.42], 'y': [0]}, {'x': [.58], 'y': [1]})    # ease-in-out
EASE_OUT = ({'x': [0], 'y': [0]}, {'x': [.58], 'y': [1]})     # ease-out

def st(v): return {'a': 0, 'k': v}

def anim(points, ease):
    """points: [(frame, value_list)] – vrátí animovanou vlastnost s easingem mezi klíči."""
    ks = []
    for f, v in points:
        k = {'t': f, 's': v}
        k['o'], k['i'] = ease[0], ease[1]
        ks.append(k)
    ks[-1].pop('o'); ks[-1].pop('i')
    return {'a': 1, 'k': ks}

def cycle(period, stops, offset=0.0):
    """stops: [(fáze 0–1, hodnota)] jedné periody → klíče přes celou délku, posunuté o offset (s)."""
    pf = period * FPS
    out, n = [], -1                     # od periody před nulou, ať je animace správně i v prvních snímcích
    start = -offset * FPS
    while start + n * pf <= OP + pf:
        for ph, v in stops:
            out.append((start + n * pf + ph * pf, v))
        n += 1
    out = [p for p in out if -pf <= p[0] <= OP + pf]
    return out

def tr(p=(0, 0), a=(0, 0), s=None, r=None, o=None):
    return {'ty': 'tr', 'p': p if isinstance(p, dict) else st(list(p)), 'a': st(list(a)),
            's': s or st([100, 100]), 'r': r or st(0), 'o': o or st(100), 'sk': st(0), 'sa': st(0)}

def fill(rgb, op=100): return {'ty': 'fl', 'c': st(rgb + [1]), 'o': st(op), 'r': 1}
def stroke(rgb, op, w): return {'ty': 'st', 'c': st(rgb + [1]), 'o': st(op), 'w': st(w), 'lc': 2, 'lj': 2}
def ellipse(w, h, p=(0, 0)): return {'ty': 'el', 'p': st(list(p)), 's': st([w, h])}
def rect(x, y, w, h, r=0): return {'ty': 'rc', 'p': st([x + w / 2, y + h / 2]), 's': st([w, h]), 'r': st(r)}
def group(items, name, t=None): return {'ty': 'gr', 'nm': name, 'it': items + [t or tr()]}

def layer(name, shapes, ks, ind):
    return {'ddd': 0, 'ind': ind, 'ty': 4, 'nm': name, 'sr': 1, 'ks': ks, 'ao': 0, 'shapes': shapes,
            'ip': 0, 'op': OP, 'st': 0, 'bm': 0}

def ks(p=(0, 0), a=(0, 0), s=None, r=None, o=None):
    return {'o': o or st(100), 'r': r or st(0), 'p': p if isinstance(p, dict) else st(list(p) + [0]),
            'a': st(list(a) + [0]), 's': s or st([100, 100, 100])}

# --- SVG cesty míče → Lottie (absolutní příkazy M L H V C Z) ---
def svg_to_shapes(d):
    toks = re.findall(r'[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?', d)
    i, cmd, cur, subs, sub = 0, None, [0, 0], [], None
    def num():
        nonlocal i; v = float(toks[i]); i += 1; return v
    while i < len(toks):
        if re.match(r'[MLHVCZ]', toks[i]): cmd = toks[i]; i += 1
        if cmd == 'M':
            sub = {'v': [], 'i': [], 'o': [], 'c': False}; subs.append(sub)
            cur = [num(), num()]; sub['v'].append(cur[:]); sub['i'].append([0, 0]); sub['o'].append([0, 0]); cmd = 'L'
        elif cmd in 'LHV':
            if cmd == 'L': cur = [num(), num()]
            elif cmd == 'H': cur = [num(), cur[1]]
            else: cur = [cur[0], num()]
            sub['v'].append(cur[:]); sub['i'].append([0, 0]); sub['o'].append([0, 0])
        elif cmd == 'C':
            c1, c2, p = [num(), num()], [num(), num()], [num(), num()]
            pv = sub['v'][-1]; sub['o'][-1] = [c1[0] - pv[0], c1[1] - pv[1]]
            sub['v'].append(p); sub['i'].append([c2[0] - p[0], c2[1] - p[1]]); sub['o'].append([0, 0]); cur = p
        elif cmd == 'Z':
            sub['c'] = True
            if len(sub['v']) > 1 and abs(sub['v'][-1][0] - sub['v'][0][0]) < 1e-3 and abs(sub['v'][-1][1] - sub['v'][0][1]) < 1e-3:
                sub['i'][0] = sub['i'][-1]; sub['v'].pop(); sub['i'].pop(); sub['o'].pop()
            cmd = None
    return [{'ty': 'sh', 'ks': st({'c': s['c'], 'v': s['v'], 'i': s['i'], 'o': s['o']})} for s in subs]

here = os.path.dirname(os.path.abspath(__file__))
svg = open(os.path.join(here, '..', 'img', 'sp-ball.svg')).read()
paths = re.findall(r'<path[^>]*?\sd="([^"]+)"[^>]*?fill="(#[0-9A-Fa-f]{6})"', svg)
ball_groups = []
for d, col in paths:
    rgb = [int(col[k:k + 2], 16) / 255 for k in (1, 3, 5)]
    ball_groups.append(group(svg_to_shapes(d) + [fill(rgb)], 'míč ' + col))
ball_groups.reverse()                                   # Lottie kreslí první položku navrch, SVG naopak

BALL = 22 / 28 * 100                                    # viewBox 28 → 22 px
layers = []
# míč: poskakuje 16 px nahoru a otáčí se (perioda 1,2 s)
layers.append(layer('Míč', ball_groups, ks(
    p=anim([(f, [88, 52 + v, 0]) for f, v in cycle(1.2, [(0, 0), (.5, -16)])], EASE_IO),
    a=(20, 20), s=st([BALL, BALL, 100]),
    r=anim([(f, [v]) for f, v in cycle(1.2, [(0, 0), (.5, 180)])], EASE_IO)), 1))
# stín pod míčem
layers.append(layer('Stín', [group([ellipse(18, 5), fill([0, 0, 0], 45)], 'stín')], ks(
    p=(88, 62.5),
    s=anim([(f, [v, v, 100]) for f, v in cycle(1.2, [(0, 100), (.5, 55)])], EASE_IO),
    o=anim([(f, [v]) for f, v in cycle(1.2, [(0, 90), (.5, 35)])], EASE_IO)), 2))
# hráči: domácí modrý vlevo, hosté červení vpravo, pohupují se ±6 px (perioda 3,2 s, hosté o půl periody posunutí)
for ind, (nm, x, col, off) in enumerate([('Domácí', 61, BRAND, 0.0), ('Hosté', 115, ERROR, -1.6)], start=3):
    layers.append(layer(nm, [group([ellipse(10, 10), fill(col)], 'tečka'), group([ellipse(16, 16), fill(col, 25)], 'aura')], ks(
        p=anim([(f, [x, 52 + v, 0]) for f, v in cycle(3.2, [(0, -6), (.5, 6)], offset=off)], EASE_SW)), ind))
# vlnky ze středového bodu (perioda 2,4 s, druhá posunutá o 1,2 s)
for ind, (nm, off) in enumerate([('Vlnka 1', 0.0), ('Vlnka 2', 1.2)], start=5):
    sc = cycle(2.4, [(0, 60), (1, 260)], offset=off)
    op_ = cycle(2.4, [(0, 0), (.15, 80), (1, 0)], offset=off)
    layers.append(layer(nm, [group([ellipse(36, 36), stroke(BRAND, 50, 1.5)], 'kruh')], ks(
        p=(88, 52), s=anim([(f, [v, v, 100]) for f, v in sc if (f % (2.4 * FPS)) != 0 or True], EASE_OUT),
        o=anim([(f, [v]) for f, v in op_], EASE_OUT)), ind))
# hřiště
white = [1, 1, 1]
pitch = [group([rect(1, 1, 174, 102, 10), stroke(white, 14, 1.5)], 'obrys'),
         group([{'ty': 'sh', 'ks': st({'c': False, 'v': [[88, 1], [88, 103]], 'i': [[0, 0], [0, 0]], 'o': [[0, 0], [0, 0]]})}, stroke(white, 14, 1.5)], 'půlicí čára'),
         group([ellipse(36, 36, (88, 52)), stroke(white, 14, 1.5)], 'středový kruh'),
         group([rect(1, 30, 22, 44), stroke(white, 14, 1.5)], 'vápno vlevo'),
         group([rect(153, 30, 22, 44), stroke(white, 14, 1.5)], 'vápno vpravo')]
layers.append(layer('Hřiště', pitch, ks(), 7))

# vlnky: skokový návrat na začátek periody (scale 260→60) — mezi koncem a začátkem další periody nechceme interpolaci
for L in layers:
    if L['nm'].startswith('Vlnka'):
        for prop in ('s', 'o'):
            k = L['ks'][prop]['k']
            for a_, b_ in zip(k, k[1:]):
                if b_['t'] - a_['t'] < 1e-6 or a_['s'] != b_['s'] and abs(b_['t'] - a_['t']) < 1e-6: a_['h'] = 1

data = {'v': '5.7.4', 'fr': FPS, 'ip': 0, 'op': OP, 'w': W, 'h': H, 'nm': 'Sport – prázdný průběh', 'ddd': 0,
        'assets': [], 'layers': layers}
out = os.path.join(here, 'empty-state.json')
json.dump(data, open(out, 'w'), ensure_ascii=False, separators=(',', ':'))
print(out, os.path.getsize(out), 'B', OP, 'snímků')
