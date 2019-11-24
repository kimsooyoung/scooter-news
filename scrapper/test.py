from pymongo.read_preferences import ReadPreference
import pymongo

import datetime

user_name = 'swimmingKim'
user_pw   = '1k3t7g547'
DB_connection = pymongo.MongoClient(f'mongodb+srv://{user_name}:{user_pw}@xingxingrepair-kj7de.mongodb.net')

article_scrap = DB_connection['test']
samples = article_scrap['samples']
samples.insert_one({ 'test': 'test data' })


# def put_to_atlas(media_name, scrapped_articles):
#     document = article_scrap[media_name]
#     result = document.insert_many(scrapped_articles)

print('Mongo Insert Done...')