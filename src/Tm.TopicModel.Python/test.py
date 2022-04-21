from lda_model import TopicAnalyzer

model = TopicAnalyzer()
text = "компьютер задача метод"
topics = model.get_keywords(0)
print(topics)