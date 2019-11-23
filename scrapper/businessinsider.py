from bs4 import BeautifulSoup
import requests

import datetime

URL = 'https://www.businessinsider.com.au/category/e-scooters'

def get_article_html():
    page_html = requests.get( URL )
    soup = BeautifulSoup(page_html.text, 'html.parser')
    page_data = soup.find_all( 'div', { 'class': 'standard-post' } )
    return page_data

def extract_data(page_data):
    articles = []
    for article in page_data:
        title = article.find('h3').find('a')
        url = title['href']
        title = str(title.string.strip())

        time = article.find('div', { 'class': 'byline-post-info' }).find('time')
        time = str(time.string.strip())

        image = article.find('span', { 'class': 'crop-thumb-primary' }).find('img')
        image_url = str(image['src'])

        article_obj = { 
            'title': title, 
            'published': time,
            'image': image_url,
            'url': url,
            'scrappedAt': datetime.datetime.now() - datetime.timedelta(hours=9),
        }
        articles.append(article_obj)
    return articles

def get_article_data():
    article_html_list = get_article_html()
    output = extract_data(article_html_list)
    return output
