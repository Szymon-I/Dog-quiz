// module contating app  global settings to prevent hardcode method

// difficulty enum
const difficulty = {
    EASY: 'easy',
    MEDIUM: 'mid',
    HARD: 'hard'
};

// concatenated dog array from breeds.json
const breeds = ['affenpinscher', 'african', 'airedale', 'akita', 'appenzeller', 'australian-shepherd', 'basenji', 'beagle', 'bluetick', 'borzoi', 'bouvier', 'boxer', 'brabancon', 'briard', 'buhund-norwegian', 'bulldog-boston', 'bulldog-english', 'bulldog-french', 'bullterrier-staffordshire', 'cairn', 'cattledog-australian', 'chihuahua', 'chow', 'clumber', 'cockapoo', 'collie-border', 'coonhound', 'corgi-cardigan', 'cotondetulear', 'dachshund', 'dalmatian', 'dane-great', 'deerhound-scottish', 'dhole', 'dingo', 'doberman', 'elkhound-norwegian', 'entlebucher', 'eskimo', 'finnish-lapphund', 'frise-bichon', 'germanshepherd', 'greyhound-italian', 'groenendael', 'havanese', 'hound-afghan', 'hound-basset', 'hound-blood', 'hound-english', 'hound-ibizan', 'hound-plott', 'hound-walker', 'husky', 'keeshond', 'kelpie', 'komondor', 'kuvasz', 'labrador', 'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese', 'mastiff-bull', 'mastiff-english', 'mastiff-tibetan', 'mexicanhairless', 'mix', 'mountain-bernese', 'mountain-swiss', 'newfoundland', 'otterhound', 'ovcharka-caucasian', 'papillon', 'pekinese', 'pembroke', 'pinscher-miniature', 'pitbull', 'pointer-german', 'pointer-germanlonghair', 'pomeranian', 'poodle-miniature', 'poodle-standard', 'poodle-toy', 'pug', 'puggle', 'pyrenees', 'redbone', 'retriever-chesapeake', 'retriever-curly', 'retriever-flatcoated', 'retriever-golden', 'ridgeback-rhodesian', 'rottweiler', 'saluki', 'samoyed', 'schipperke', 'schnauzer-giant', 'schnauzer-miniature', 'setter-english', 'setter-gordon', 'setter-irish', 'sheepdog-english', 'sheepdog-shetland', 'shiba', 'shihtzu', 'spaniel-blenheim', 'spaniel-brittany', 'spaniel-cocker', 'spaniel-irish', 'spaniel-japanese', 'spaniel-sussex', 'spaniel-welsh', 'springer-english', 'stbernard', 'terrier-american', 'terrier-australian', 'terrier-bedlington', 'terrier-border', 'terrier-dandie', 'terrier-fox', 'terrier-irish', 'terrier-kerryblue', 'terrier-lakeland', 'terrier-norfolk', 'terrier-norwich', 'terrier-patterdale', 'terrier-russell', 'terrier-scottish', 'terrier-sealyham', 'terrier-silky', 'terrier-tibetan', 'terrier-toy', 'terrier-westhighland', 'terrier-wheaten', 'terrier-yorkshire', 'vizsla', 'waterdog-spanish', 'weimaraner', 'whippet', 'wolfhound-irish'];

// opotions number for given difficulty
const difficultyNumber = {
    easy: 2,
    mid: 4,
    hard: 5,
}
// number of answers to choose
const answerNoptions = {
    easy: 10,
    mid: 20,
    hard: 30,
}
// api url for fetching dogs
const randomImageUrl = 'https://dog.ceo/api/breeds/image/random';

// main color of unique components
const mainColor = '#4287f5';

export { difficulty, breeds, difficultyNumber, randomImageUrl, answerNoptions, mainColor }