import spacy
import time
nlp = spacy.load("ru_core_news_md", disable=["parser", "ner"])
def lemmatize_texts(texts, allowed_postags={"NOUN", "ADJ", "VERB", "ADV"}):
    processed_count = 0
    texts_count = len(texts)

    texts_out = []
    for text in texts:
        doc = nlp(text)
        new_text = []
        for token in doc:
            if token.pos_ in allowed_postags:
                new_text.append(token.lemma_)
        final = " ".join(new_text)
        texts_out.append(final)
        processed_count+=1
        print(processed_count, '/', texts_count, sep='')

    return (texts_out)

def lemmatize_text(text, allowed_postags={"NOUN", "ADJ", "VERB", "ADV"}):
    #start = time.time()
    doc = nlp(text)
    new_text = []
    for token in doc:
        if (not token.is_stop) and (token.pos_ in allowed_postags):
            new_text.append(token.lemma_)
    final = " ".join(new_text)
    #end=time.time() - start
    #print(f'time: {end} sec')
    return final
