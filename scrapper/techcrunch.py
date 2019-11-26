from bs4 import BeautifulSoup
import requests

import datetime

URL = 'https://techcrunch.com/tag/electric-scooters/'

def get_article_html():
    page_html = requests.get( URL )
    soup = BeautifulSoup(page_html.text, 'html.parser')
    page_data = soup.find_all( 'div', { 'class': 'post-block' } )
    return page_data

def extract_data(page_data):
    articles = []
    for article in page_data:
        title = article.find('a', { 'class': 'post-block__title__link'})
        title = str(title.string.strip())

        description = article.find('div', { 'class': 'post-block__content' })
        description = str(description.string.strip())

        time = article.find('div', { 'class': 'river-byline' }).find('time')
        time = str(time.string.strip())

        image = article.find('img')
        image_url = str(image['src'])

        url = article.find('a', { 'class': 'post-block__title__link' })
        url = str(url['href'])

        article_obj = { 
            'title': title, 
            'description': description,
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