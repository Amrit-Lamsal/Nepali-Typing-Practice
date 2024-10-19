document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const sampleTextElement = document.getElementById('sample-text');
    const userInputElement = document.getElementById('user-input');
    const correctCountElement = document.getElementById('correct-count');
    const mistakeCountElement = document.getElementById('mistake-count');
    const customTextInput = document.getElementById('custom-text-input');
    const startCustomTextBtn = document.getElementById('start-custom-text');
    const resetBtn = document.getElementById('reset-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');

    // Constants
    const WORDS_PER_CHUNK = 25;
    const defaultText = `नेपाल संसारको सबैभन्दा सुन्दर हिमाली देश हो। यो दक्षिण एशियाको एक सानो मुलुक हो, जहाँ विभिन्‍न भाषा, धर्म, संस्कृति, र परम्पराहरुको मिश्रण पाइन्छ। यसको प्राकृतिक सुन्दरताले देशका सबै सहर र गाउँलाई विशेष बनाएको छ। नेपालका हिमालहरु मात्र होइन, यहाँका वन, ताल, नदी, र झरनाहरु पनि पर्यटकहरुको मुख्य आकर्षण हुन्।

नेपालमा सबैभन्दा प्रमुख आकषिर्त क्षेत्र भनेको हिमाल हो। यहाँको सगरमाथा, संसारको सबैभन्दा अग्लो हिमाल हो, जसलाई अंग्रेजीमा माउन्ट एभरेस्ट भनिन्छ। यसलाई हरेक वर्ष हजारौं पर्यटक र साहसी पर्यटकहरुले आरोहण गर्छन्। सगरमाथा क्षेत्रमा सगरमाथा राष्ट्रिय निकुञ्ज पनि छ, जसमा विभिन्‍न किसिमका वन्यजन्तुहरु पाइन्छन्।

नेपालले प्रकृति मात्र होइन, सांस्कृतिक धरोहरको दृष्टिकोणले पनि महत्वपूर्ण स्थान ओगटेको छ। काठमाण्डौ, भक्तपुर, र पाटन जस्ता पुराना शहरहरुमा परम्परागत नेपाली कला र संस्कृतिका उत्कृष्ट नमूनाहरु पाइन्छन्। यी शहरहरुमा विभिन्न मंदिर, स्तुपा, र दरबारहरु छन्, जसले पर्यटकहरुलाई आकर्षित गर्छन्। नेपालका परम्परागत पर्व र चाडपर्वहरु पनि विशेष महत्वका हुन्छन्। दसैं, तिहार, र होली जस्ता चाडपर्वहरु निकै धुमधामका साथ मनाइन्छन्।

नेपालको अरु प्रमुख आकर्षण मध्ये लुम्बिनी पनि महत्वपूर्ण छ। लुम्बिनी गौतम बुद्धको जन्मस्थल हो, जसलाई बौद्ध धर्मावलम्बीहरुका लागि पवित्र स्थल मानिन्छ। लुम्बिनीमा मायादेवी मन्दिर र विभिन्न बौद्ध विहारहरु छन्, जसले पर्यटकहरुलाई बौद्ध धर्मको इतिहास र महत्व बुझ्न सहयोग गर्छ।

नेपालको जनसंख्या बहुसंख्यक हिन्दू धर्मावलम्बीहरु छन्। यहाँ विभिन्‍न जातजाति र समुदायहरु बसेका छन्, जस्तै नेवार, गुरुङ, मगर, तामाङ, आदि। यिनीहरु सबैले आफ्नो भाषा, धर्म, र संस्कृतिलाई जोगाइराखेका छन्। नेपाली भाषा यहाँको सरकारी भाषा हो, तर यहाँ विभिन्‍न मातृभाषाहरु पनि बोलिन्छन्।

नेपालको आर्थिक अवस्था कृषि, पर्यटन, र हस्तकला उद्योगमा आधारित छ। यहाँका कृषकहरु मुख्यतया धान, मकै, गहुँ, आलु आदि खेती गर्छन्। पर्यटन उद्योगले देशको अर्थतन्त्रमा ठूलो योगदान पुर्याउँछ। साहसिक पर्यटनका लागि यहाँ पर्वतारोहण, ट्रेकिङ, राफ्टिङ, र जंगल सफारीजस्ता गतिविधिहरु प्रचलित छन्। हस्तकला उद्योगमा भने यहाँका लोकबाजा, ढाका कपडा, र थाङ्का चित्रकलाहरु विश्वप्रसिद्ध छन्।

नेपालमा शिक्षा र स्वास्थ्य क्षेत्रमा पनि सुधार हुँदै गएको छ। यहाँका विभिन्न शैक्षिक संस्थाहरुले विद्यार्थीहरुलाई उच्चस्तरीय शिक्षा प्रदान गर्छन्। स्वास्थ्य क्षेत्रमा पनि विभिन्न अस्पताल र स्वास्थ्य केन्द्रहरु सञ्चालनमा छन्, जसले जनताको स्वास्थ्य सेवामा महत्वपूर्ण योगदान पुर्याइरहेका छन्।

नेपालको राजनीतिक अवस्था पछिल्लो केही वर्षदेखि स्थिर हुँदै गएको छ। यहाँका विभिन्न राजनीतिक दलहरुले लोकतान्त्रिक प्रणालीलाई सुदृढ बनाउन महत्वपूर्ण भूमिका खेलिरहेका छन्।

अन्ततः, नेपाल एक यस्तो देश हो, जसले आफ्नो प्राकृतिक सुन्दरता, सांस्कृतिक धरोहर, र जनताको मैत्रीपूर्ण व्यवहारले सबैलाई आकर्षित गर्छ। यहाँको हरियाली, सफा हावा, र हिमालहरुले सबैको मनलाई मोहित बनाउँछन्। यो देश केवल घुम्न मात्र होइन, बस्न पनि उपयुक्त छ।

`;
    const PURNA_VIRAM = '।';

    // Add default text button
    const startDefaultTextBtn = document.createElement('button');
    startDefaultTextBtn.id = 'start-default-text';
    startDefaultTextBtn.textContent = 'डिफल्ट पाठबाट सुरु गर्नुहोस्';
    document.querySelector('.custom-text-form').appendChild(startDefaultTextBtn);

    // State variables
    let timerInterval;
    let startTime = null;
    let elapsedTime = 0;
    let correctCount = 0;
    let mistakeCount = 0;
    let currentChunk = 0;
    let word_pointer = 0;
    let fullText = [];
    let sampleText = [];
    let lockedWords = [];
    let isPaused = false;

    // Timer functions
    function startTimer() {
        if (!startTime) startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
        isPaused = false;
        pauseBtn.textContent = 'पज गर्नुहोस्';
        userInputElement.disabled = false;
    }

    function pauseTimer() {
        if (!isPaused) {
            clearInterval(timerInterval);
            elapsedTime += new Date() - startTime;
            isPaused = true;
            pauseBtn.textContent = 'जारी राख्नुहोस्';
            userInputElement.disabled = true;
        } else {
            startTime = new Date();
            startTimer();
        }
    }

    function updateTimer() {
        const currentTime = new Date();
        const totalElapsed = Math.floor((currentTime - startTime + elapsedTime) / 1000);
        const minutes = Math.floor(totalElapsed / 60);
        const seconds = totalElapsed % 60;

        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        const minutesElapsed = totalElapsed / 60;
        const wpm = Math.round(correctCount / minutesElapsed) || 0;
        wpmElement.textContent = wpm;

        const totalAttempts = correctCount + mistakeCount;
        const accuracy = totalAttempts ? Math.round((correctCount / totalAttempts) * 100) : 0;
        accuracyElement.textContent = accuracy;
    }

    // Add event listener for default text button
    startDefaultTextBtn.addEventListener('click', function () {
        resetTypingTest();
        customTextInput.value = defaultText;
        fullText = splitSentenceWithPurnaViram(defaultText);
        currentChunk = 0;
        loadNextChunk();
        userInputElement.disabled = false;
        userInputElement.focus();
        startTimer();
    });

    // Custom text input handling
    startCustomTextBtn.addEventListener('click', function () {
        const customText = customTextInput.value.trim();
        if (customText) {
            resetTypingTest();
            fullText = splitSentenceWithPurnaViram(customText);
            currentChunk = 0;
            loadNextChunk();
            userInputElement.disabled = false;
            userInputElement.focus();
            startTimer();
        }
    });

    // Load next chunk of text
    function loadNextChunk() {
        const startIndex = currentChunk * WORDS_PER_CHUNK;
        const endIndex = startIndex + WORDS_PER_CHUNK;

        if (startIndex < fullText.length) {
            currentChunk++;
            sampleText = fullText.slice(startIndex, endIndex);
            word_pointer = 0;
            lockedWords = [];
            displayText();
            return true;
        }
        return false;
    }

    // Reset typing test
    function resetTypingTest() {
        clearInterval(timerInterval);
        fullText = [];
        sampleText = [];
        currentChunk = 0;
        word_pointer = 0;
        correctCount = 0;
        mistakeCount = 0;
        lockedWords = [];
        startTime = null;
        elapsedTime = 0;
        isPaused = false;
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        wpmElement.textContent = '0';
        accuracyElement.textContent = '0';
        userInputElement.value = '';
        userInputElement.disabled = true;
        updateCounts();
    }

    // Typing event handlers
    userInputElement.addEventListener('input', function (e) {
        if (!isPaused) {
            const userInput = e.target.value;
            checkTyping(userInput, false);
        }
    });

    userInputElement.addEventListener('keydown', function (e) {
        if (isPaused) return;

        if (e.key === 'Enter' || e.key === ' ') {
            const userInput = userInputElement.value;
            if (userInput) {
                const isCorrect = checkTyping(userInput, true);
                lockedWords[word_pointer] = isCorrect;
                if (isCorrect) correctCount++;
                else mistakeCount++;

                word_pointer++;
                userInputElement.value = '';
                updateCounts();

                // Check if current chunk is completed
                if (word_pointer >= sampleText.length) {
                    if (!loadNextChunk()) {
                        clearInterval(timerInterval);
                        userInputElement.disabled = true;
                        sampleTextElement.innerHTML = '<span class="correct">सबै पाठ समाप्त भयो! बधाई छ! 🎉</span>';
                    }
                }
            }
            e.preventDefault();
        }
    });

    // Check if typed input is correct
    function checkTyping(userInput, confirm = false) {
        const userWords = userInput.split(' ');
        let displayText = '';
        let wordIsCorrect = true;

        for (let i = 0; i < sampleText.length; i++) {
            const sampleWord = sampleText[i];
            const userWord = userWords[0] || '';

            if (i < word_pointer) {
                displayText += `<span class="${lockedWords[i] ? 'correct' : 'error'}">${sampleWord}</span> `;
            } else if (i === word_pointer) {
                let checkedWord = '';
                // Exact match required for words with Purna Viram
                if (sampleWord.includes(PURNA_VIRAM)) {
                    wordIsCorrect = (userWord === sampleWord);
                } else {
                    // For words without Purna Viram, allow partial matching while typing
                    wordIsCorrect = !confirm ? 
                        sampleWord.startsWith(userWord) : 
                        (userWord === sampleWord);
                }

                if (confirm) {
                    checkedWord = wordIsCorrect ?
                        `<span class="correct">${sampleWord}</span>` :
                        `<span class="error">${sampleWord}</span>`;
                } else {
                    if (wordIsCorrect) {
                        checkedWord = `<span class="correct">${userWord}</span>`;
                        checkedWord += `<span class="untouched">${sampleWord.substring(userWord.length)}</span>`;
                    } else {
                        checkedWord = `<span class="error">${sampleWord}</span>`;
                    }
                }
                displayText += checkedWord + ' ';
            } else {
                displayText += `<span class="untouched">${sampleWord}</span> `;
            }
        }
        sampleTextElement.innerHTML = displayText.trim();
        return wordIsCorrect;
    }

    // Display sample text
    function displayText() {
        sampleTextElement.innerHTML = sampleText.map((word, i) => {
            return `<span class="untouched">${word}</span>`;
        }).join(' ');
    }

    // Update correct/mistake counts
    function updateCounts() {
        correctCountElement.textContent = correctCount;
        mistakeCountElement.textContent = mistakeCount;
    }

    // Split Nepali sentence properly handling Purna Viram
    function splitSentenceWithPurnaViram(text) {
        // First, ensure spaces around Purna Viram for proper splitting
        text = text.replace(/।/g, ' । ');
        // Split by whitespace and filter out empty strings
        return text.split(/\s+/).filter(word => word.length > 0);
    }

    // Add event listener for reset button
    resetBtn.addEventListener('click', function () {
        resetTypingTest();
    });

    // Add event listener for pause button
    pauseBtn.addEventListener('click', function () {
        pauseTimer();
    });
});