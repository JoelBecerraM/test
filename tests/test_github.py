
import unittest
import requests
import json

class TestGitHubAPI(unittest.TestCase):
    def test_get_user_status(self):
        # Probamos que la API de GitHub responda 200 (OK)
        response = requests.get("https://api.github.com")
        self.assertEqual(response.status_code, 200)
        
        # Verificamos que el nombre de usuario sea el correcto en el JSON
        data = response.json()
        print(json.dumps(data, indent=4))

        self.assertEqual(data['current_user_url'], 'https://api.github.com/user')

if __name__ == '__main__':
    unittest.main()

