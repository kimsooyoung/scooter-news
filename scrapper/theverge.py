
from bs4 import BeautifulSoup
import requests

import datetime

URL = 'https://www.theverge.com/scooters'

def get_article_html():
    page_html = requests.get( URL )
    soup = BeautifulSoup(page_html.text, 'html.parser')
    page_data = soup.find_all( 'div', { 'class': 'c-entry-box--compact' } )
    return page_data

def extract_data(page_data):
    articles = []
    for article in page_data:
        title = article.find('a', { 'data-chorus-optimize-field': 'hed' })
        url = title['href']
        title = title.string.strip()

        time = article.find('time', { 'class': 'c-byline__item' })
        time = str(time.string.strip())

        image = article.find('div', {'class': 'c-entry-box--compact__image'}).find_all('img')
        image_url = str(image[1]['src']).strip()

        article_obj = { 
            'title': title,
            'published': time,
            'image': image_url,
            'url': url,
            'scrappedAt': datetime.datetime.now(),
        }
        articles.append(article_obj)
    return articles

def get_article_data():
    article_html_list = get_article_html()
    output = extract_data(article_html_list)
    return output