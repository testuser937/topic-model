from multiprocessing.dummy import freeze_support

import psycopg
from multiprocessing import Pool
import time
import text_cleaner

from lda_model import TopicAnalyzer

ta = TopicAnalyzer()


def work(topic):
    print(topic[0])
    words = text_cleaner.gen_words([topic[1]])[0]
    bow = ta.lda_model.id2word.doc2bow(words)
    topics = ta.lda_model.get_document_topics(bow)
    if len(topics) > 0:
        t = topics[0]
        if t[1] > 0.3:
            topic_words = ta.lda_model.show_topic(t[0])[:7]
            top_words = [i[0] for i in topic_words]
            return topic[0], top_words
    return None


def main():
    with psycopg.connect(
            host="localhost",
            dbname="postgres",
            user="postgres",
            password="1234"
    ) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT article_id, text FROM tm.clean_article")
            texts = cur.fetchall()

            start_time = time.time()
            with Pool(7) as p:
                answer = p.map(work, texts)
            end_time = time.time() - start_time
            print(end_time)

            filtered_answer = [i for i in answer if i is not None]

            with cur.copy("COPY tm.tm_result (article_id, topic) from STDIN ") as copy:
                for topic in filtered_answer:
                    for word in topic[1]:
                        copy.write_row((topic[0], word))


if __name__ == '__main__':
    freeze_support()
    main()