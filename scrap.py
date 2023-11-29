import requests
from bs4 import BeautifulSoup
import csv

def scrape_brightermonday_jobs():
    base_url = 'https://www.brightermonday.co.ke/jobs'
    page_number = 1
    job_data = []

    while True:
        url = f'{base_url}?page={page_number}'
        response = requests.get(url)
        print(response.status_code)
        # return
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')

            job_divs = soup.find_all('div', attrs={'data-cy': 'listing-cards-components'})

            if not job_divs:
                break

            for div in job_divs:
                job_links = div.find_all('a', href=True)

                for link in job_links:
                    title = link.get_text(strip=True)
                    job_url = link['href']

                    job_data.append({'Title': title, 'URL': job_url})

            page_number += 1

        else:
            print(f'Failed to retrieve page {page_number}')
            break

    # Writing to CSV file
    with open('brightermonday_jobs.csv', mode='w', newline='', encoding='utf-8') as file:
        fieldnames = ['Title', 'URL']
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        writer.writeheader()
        writer.writerows(job_data)

scrape_brightermonday_jobs()
