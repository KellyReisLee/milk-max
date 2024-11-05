from dataclasses import dataclass

@dataclass
class cow:
    id: int
    raca: str
    nasc: str
    peso: float

VACAS = [None] * 200
VACAS[0] = cow(id=0, raca="0", nasc="0", peso=0)

VACAS[1] = cow(id=1, raca="holandesa", nasc="2020-11-23", peso=620)
VACAS[2] = cow(id=2, raca="holandesa", nasc="2018-4-6", peso=600)
VACAS[3] = cow(id=3, raca="jersey", nasc="2023-5-16", peso=412)
VACAS[4] = cow(id=4, raca="pardo", nasc="2014-12-1", peso=635)
VACAS[5] = cow(id=5, raca="holandesa", nasc="2018-4-6", peso=670)

raca = "jersey"
nasc = "2002-08-16"
peso = 400

posicao = 6
VACAS[posicao] = cow(id=posicao, raca=raca, nasc=nasc, peso=peso)
print(VACAS[posicao].raca)