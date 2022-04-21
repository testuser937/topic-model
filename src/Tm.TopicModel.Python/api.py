import json

from flask import Flask, request
from flask_cors import CORS, cross_origin
import lemmatizer

from lda_model import TopicAnalyzer

ta = TopicAnalyzer()
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def obj_dict(obj):
    return obj.__dict__

@app.route('/api/analyze', methods=['POST'])
@cross_origin()
def analyze_topics():
    req_json = request.get_json()
    res = ta.get_topics(req_json['Text'])
    json_str = json.dumps(res, default=obj_dict, ensure_ascii=False, indent=4)
    bytes = json_str.encode('utf8')
    print(json_str)
    return bytes

@app.route('/api/model-topics', methods=['GET'])
@cross_origin()
def get_model_topics():
    res =  ta.get_model_topic()
    return res

@app.route('/api/lemmatize', methods=['POST'])
@cross_origin()
def lemmatize():
    req_json = request.get_json()
    texts = req_json['Texts']
    lemmatized = lemmatizer.lemmatize(texts)
    return json.dumps(lemmatized, default=obj_dict, ensure_ascii=False, indent=4).encode('utf8')

if __name__ == '__main__':
    app.run()

