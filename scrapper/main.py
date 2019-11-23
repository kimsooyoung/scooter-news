from techcrunch import get_article_data as get_tc_article
from theverge import get_article_data as get_tv_article
from businessinsider import get_article_data as get_bi_article
from mongo_save import put_to_atlas

from bs4 import BeautifulSoup
import requests


try:
    tc_article = get_tc_article()
    tv_article = get_tv_article()
    bi_article = get_bi_article()

    put_to_atlas('techcrunch', tc_article)
    put_to_atlas('theverge', tv_article)
    put_to_atlas('businessinsider', bi_article)
    
except Exception as e:
    print(e)
finally:
    print('Done...')