from dotenv import load_dotenv
import os

load_dotenv()

# Load environment variables from .env file
uri = os.getenv('MONGODB_URI')
