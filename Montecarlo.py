"""
Este código é uma simulação do experimento das agulhas de Georges-Louis Leclerc, o intuito do experimento é determinar a probabilidade de que uma agulha, ao ser derrubada no chão ao acaso, atravesse o vão entre duas tábuas de madeira
"""

# matplotlib é a biblioteca que permite a construção de gráficos e figuras
import matplotlib.pyplot as plt
# random adiciona a função random.uniform que gera um número pseudorrandômico
import random
# math é a biblioteca padrão do Python para funções matemáticas
import math
# numpy é o math só que feito pra modelagem matemática e computação cientifica
import numpy as np

# A variável AGULHAS será uma das variáveis que poderá ser alterada pelo usuário
AGULHAS = 10000


class DefineNeedle:

"""
Uma classe para representar as agulhas, esta classe possui 6 atributos.
X, Y que representam as coordenadas do centro da agulha
theta (θ) que representa o ângulo entre a agulha e o eixo x, em radianos
length (L) que representa o comprimento da agulha
needle_coordinates é um array que representa as coordenadas (x,y)
complex_representation é outro array para representar a agulha como um número complexo
end_points é outro array que representa as duas pontas da agulha como (L/2*cos(θ), L/2*sin(θ)
"""
    def __init__(self, x=None, y=None, theta=None, length=0.5):


        if x is None:
            x = random.uniform(0, 1)
        if y is None:
            y = random.uniform(0, 1)
        if theta is None:
            theta = random.uniform(0, math.pi)

"""
Se os atributos x, y e theta não forem dados, eles serão definidos pela função random.uniform que gera um número pseudorrandômico entre 0 e 1 ou entre 0 e pi no caso do ângulo
"""

        self.needle_coordinates = np.array([x, y])
        self.complex_representation = np.array(
            [length/2 * math.cos(theta), length/2*math.sin(theta)])
        self.end_points = np.array([np.add(self.needle_coordinates, -1*np.array(
            self.complex_representation)), np.add(self.needle_coordinates, self.complex_representation)])


    def intersects_with_y(self, y):
        return self.end_points[0][1] < y and self.end_points[1][1] > y

"""
Checa se as agulhas intersectam o vão entre duas tábuas a partir de uma determinada coordenada Y. consideramos que a probabilidade da agulha intersectar o chão é a mesma ao longo de todo o eixo X então iremos ignorar ele
"""

class BuffonSimulation:

"""
Uma classe que representa a simulação em si, ela tem 4 atributos
floor é a lista de coordenadas y dos vãos entre as tábuas
boards é o número de vãos que irão aparecer na simulação
list_of_needle_objects é o número de agulhas que serão jogados, é igual a variável AGULHAS
number_of_intersections é o número de interseções
"""
    def __init__(self):
        self.floor = []
        self.boards = 2
        self.list_of_needle_objects = []
        self.number_of_intersections = 0

        fig = plt.figure(figsize=(10, 10))
        self.buffon = plt.subplot()
        self.results_text = fig.text(
            0, 0, self.estimate_pi(), size=15)
        self.buffon.set_xlim(-0.1, 1.1)
        self.buffon.set_ylim(-0.1, 1.1)

    def plot_floor_boards(self):
        for j in range(self.boards):
            self.floor.append(0+j)
            self.buffon.hlines(
                y=self.floor[j], xmin=0, xmax=1, color='black', linestyle='--', linewidth=2.0)

    def toss_needles(self):
        needle_object = DefineNeedle()
        self.list_of_needle_objects.append(needle_object)
        x_coordinates = [needle_object.end_points[0]
                         [0], needle_object.end_points[1][0]]
        y_coordinates = [needle_object.end_points[0]
                         [1], needle_object.end_points[1][1]]

        for board in range(self.boards):
            if needle_object.intersects_with_y(self.floor[board]):
                self.number_of_intersections += 1
                self.buffon.plot(x_coordinates, y_coordinates,
                                 color='green', linewidth=1)
                return
        self.buffon.plot(x_coordinates, y_coordinates,
                         color='red', linewidth=1)

"""
Arremessamos uma agulha e checamos se ela atravessou alguma das tábuas, se ela atravessou então o número de intersecções aumenta em 1 e a agulha é então plotada em verde, se ela não atravessa nenhuma tábua, então ela é colorida em vermelho
"""

    def estimate_pi(self, needles_tossed=0):
        if self.number_of_intersections == 0:
            estimated_pi = 0
        else:
            estimated_pi = (needles_tossed) / \
                (1 * self.number_of_intersections)
        error = abs(((math.pi - estimated_pi)/math.pi)*100)
        return (" Intersections:" + str(self.number_of_intersections) +
                "\n Agulhas: " + str(needles_tossed) +
                "\n Aproximação de Pi: " + str(estimated_pi))

"""
Podemos estimar o valor de pi usando este experimento dividindo a quantidade de agulhas jogadas ao todo pela quantidade de intersecções. Este processo é uma aplicação clássica da estatística e gera uma aproximação para Pi
"""

    def plot_needles(self):
        for needle in range(AGULHAS):
            self.toss_needles()
            self.results_text.set_text(self.estimate_pi(needle+1))
            if (needle+1) % 200 == 0:
                plt.pause(1/200)
        plt.title("Estimando Pi com probabilidade")

"""
Esta função chama a função toss_needles um número de vezes igual ao definido pela variável AGULHAS. Depois de cada arremesso, ela atualiza a aproximação de pi chamando a função estimate_pi, se o número de agulhas é um multiplo de 200, a função pausa por um tempo
"""

    def plot(self):
        self.plot_floor_boards()
        self.plot_needles()
        plt.show()


simulation = BuffonSimulation()
simulation.plot()

"""
Por fim, chamamos o matplotlib para plotar as tábuas, as agulhas e mostrar as informações calculadas nas funções anteriores
"""
