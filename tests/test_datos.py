
import unittest

def es_email_valido(email):
    return "@" in email and "." in email

class TestValidaciones(unittest.TestCase):
    def test_email_correcto(self):
        self.assertTrue(es_email_valido("usuario@correo.com"))

    def test_email_sin_arroba(self):
        self.assertFalse(es_email_valido("usuariocorreo.com"))

    def test_email_vacio(self):
        self.assertFalse(es_email_valido(""))

if __name__ == '__main__':
    unittest.main()

