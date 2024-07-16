function talk() {
    const know = {
      "Who are you": "Hello, I am Boe, your chatbot.",
      "How are you": "I'm doing great, thank you! How can I assist you today?",
      "Your favourite Cricket Team": "My favorite cricket team is Mumbai Indians. Which team do you support?",
      "Tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
      "What's the weather like?": "I'm not sure, but you can check a weather app for the latest updates.",
      "Who is your creator?": "I was created by a talented developer named Harsh.",
      "What's your favorite color?": "I love all bright and vibrant colors!",
      "Goodbye": "Goodbye! Have a great day!",
      "What is the capital of France?": "The capital of France is Paris.",
      "Who is the president of the USA?": "As of 2024, the president of the USA is Joe Biden.",
      "What is the tallest mountain in the world?": "The tallest mountain in the world is Mount Everest.",
      "How many continents are there?": "There are seven continents on Earth: Africa, Antarctica, Asia, Europe, North America, Australia, and South America.",
      "What is the largest ocean?": "The largest ocean on Earth is the Pacific Ocean.",
      "Who wrote 'To Kill a Mockingbird'?": "'To Kill a Mockingbird' was written by Harper Lee.",
      "What is the speed of light?": "The speed of light is approximately 299,792 kilometers per second (km/s).",
      "What is the capital of Japan?": "The capital of Japan is Tokyo.",
      "How many planets are in the Solar System?": "There are eight planets in the Solar System.",
      "Who invented the telephone?": "The telephone was invented by Alexander Graham Bell.",
      "What is the smallest country in the world?": "The smallest country in the world is Vatican City.",
      "What is the largest country in the world?": "The largest country in the world by land area is Russia.",
    };
  
    const user = document.getElementById('userBox').value.toLowerCase().trim();
    const chatLog = document.getElementById('chatLog');
    chatLog.innerHTML = "You: " + user + "<br>";
  
    const response = findBestMatch(user, know);
  
    if (response) {
      chatLog.innerHTML += "Bot: " + response + "<br>";
    } else {
      chatLog.innerHTML += "Bot: Sorry, I didn't understand that. Can you please rephrase?<br>";
    }
  
    document.getElementById('userBox').value = ""; // Clear the input box after asking a question
  }
  
  function findBestMatch(userInput, know) {
    let bestMatch = null;
    let highestScore = 0;
  
    for (let key in know) {
      const score = similarity(userInput, key.toLowerCase());
      if (score > highestScore) {
        highestScore = score;
        bestMatch = know[key];
      }
    }
  
    // Consider it a match if the similarity score is higher than a threshold
    return highestScore > 0.4 ? bestMatch : null;
  }
  
  function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
  
    if (longerLength === 0) {
      return 1.0;
    }
  
    const distance = editDistance(longer, shorter);
    return (longerLength - distance) / parseFloat(longerLength);
  }
  
  function editDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  }
  