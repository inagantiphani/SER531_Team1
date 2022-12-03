# Load your usual SpaCy model (one of SpaCy English models)
import neuralcoref
import spacy
nlp = spacy.load('en_core_web_lg')

# Add neural coref to SpaCy's pipe
neuralcoref.add_to_pipe(nlp)

# Now we can use Neuracoref for Spacy Annotations.

data1 = '''It is a bright sunny day at Bangalore, India played Pakistan on Oct 27th 2007 . India has won the toss and choose to bat first. 
The toss has been won by India. It is an T20 international match as it is a T20 tournament. Match ID of the broadcasting match is 145227. 
India has won the the match against Pakistan by 8 wickets.'''


data1.rstrip()

opdoc = nlp(data1)
ntriples = []
sub = ''
pred = ''
obj = ''

subTags = ['nsubj', 'nsubjpass', 'csubj', 'csubjpass',
               'agent', 'expl']
objTags = ['dobj', 'dative', 'attr', 'oprd']
conTags = ['conj']

for token in opdoc:

    pass

print()

for chunk in opdoc.noun_chunks:
    print(chunk.text, '|', chunk.root.text, '|',
          chunk.root.dep_, '|', chunk.root.head.text)
    if chunk.root.dep_ in subTags:
        sub = chunk.text
        obj = ''
    elif chunk.root.dep_ in objTags:
        pred = chunk.root.head.text
        obj = chunk.text
        if sub:
            triples.append((sub, pred, obj))
    elif chunk.root.dep_ in conTags:
        if pred and sub:
            triples.append((sub, pred, chunk.text))
    elif chunk.root.dep_ == 'pobj':
        if sub and pred:
            triples.append((obj, chunk.root.head.text, chunk.text))
print()
for x in ntriples:
    print(x)
print()

# RESOLUTION OF COREF
for x in doc._.coref_clusters:
    print(x)
