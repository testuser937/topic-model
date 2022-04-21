from multiprocessing.dummy import freeze_support

import psycopg
import lemmatizer
from multiprocessing import Pool
import time


def work(topic):
    cleaned = lemmatizer.lemmatize_text(topic[1])
    print(topic[0])
    return (topic[0], cleaned)


def fetch():
    with psycopg.connect(
            host="localhost",
            dbname="postgres",
            user="postgres",
            password="1234"
    ) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, text FROM tm.article")
            topics = cur.fetchall()

            start_time = time.time()
            with Pool(7) as p:
                answer = p.map(work, topics)
            end_time = time.time() - start_time
            print(end_time)

            with cur.copy("COPY tm.clean_article (article_id, text) from STDIN ") as copy:
                for topic in answer:
                    copy.write_row(topic)


if __name__ == "__main__":
    freeze_support()
    fetch()
