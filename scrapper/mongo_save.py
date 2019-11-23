from pymongo.read_preferences import ReadPreference
import pymongo

import datetime

user_name = 'read-write'
user_pw   = 'rlatndud'
DB_connection = pymongo.MongoClient(f'mongodb+srv://{user_name}:{user_pw}@mongo-personal-u4uyj.mongodb.net')

article_scrap = DB_connection['article-scrap']

def put_to_atlas(media_name, scrapped_articles):
    document = article_scrap[media_name]
    result = document.insert_many(scrapped_articles)

print('Mongo Insert Done...')