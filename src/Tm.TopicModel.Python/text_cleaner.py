from typing import List
from gensim.utils import simple_preprocess


def gen_words(texts: List[str]):
    """

    :param texts:
    :return:
    """
    final = []
    for text in texts:
        new = simple_preprocess(text, deacc=True)
        final.append(new)
    return final
