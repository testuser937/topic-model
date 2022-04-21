from gensim.models import LdaMulticore
import text_cleaner
import json


class TopicAnalyzer:
    def __init__(self):
        self.lda_model = LdaMulticore.load("model/lda_model.gensim")

    def get_model_topic(self):
        topics = self.lda_model.print_topics()
        return json.dumps(topics, ensure_ascii=False, indent=4).encode('utf8')

    def get_topics(self, text: str):
        cleaned_text = text_cleaner.gen_words([text])
        bow = self.lda_model.id2word.doc2bow(cleaned_text[0])
        topics = self.lda_model.get_document_topics(bow)
        res = []
        for i in topics:
            topicId = i[0]
            prob = i[1]
            keyWords = self.get_keywords(topicId)
            res.append(Topic(topicId, prob, keyWords))
        # dominant_topic = sorted(topics, key=lambda x: x[1], reverse=True)[0]
        # keywords = self.get_keywords(dominant_topic[0])
        return res


    def get_keywords(self, topic_num):
        wp = self.lda_model.show_topic(topic_num)
        topic_keywords = ", ".join([word for word, prop in wp[:5]])
        return topic_keywords


class Topic:
    def __init__(self, topic_id, probability, keyWords):
        self.TopicId = int(topic_id)
        self.Probability = float(probability)
        self.KeyWords = keyWords


class TopicEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Topic):
            return object.__dict__
        return json.JSONEncoder.default(self, obj)