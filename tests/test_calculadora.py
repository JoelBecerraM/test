
import unittest
from calculadora import sumar

class TestCalculadora(unittest.TestCase):

    # Prueba que la suma de dos números positivos sea correcta
    def test_sumar_positivos(self):
        resultado = sumar(5, 7)
        self.assertEqual(resultado, 12)

    # Prueba que la suma con números negativos funcione
    def test_sumar_negativos(self):
        resultado = sumar(-1, 1)
        self.assertEqual(resultado, 0)

    # Prueba que falle si el resultado es incorrecto (para validar el test)
    def test_sumar_error(self):
        self.assertNotEqual(sumar(2, 2), 5)

if __name__ == '__main__':
    unittest.main()

