document.addEventListener("DOMContentLoaded", function () {
    // Meal Plans based on diet type
    const mealPlans = {
        vegan: ["Quinoa Salad 🥗", "Tofu Stir-Fry 🍛", "Vegan Smoothie 🥤"],
        keto: ["Grilled Chicken 🥩", "Avocado & Eggs 🥑", "Cauliflower Rice 🍚"],
        paleo: ["Salmon & Veggies 🐟", "Sweet Potato Mash 🍠", "Berry Bowl 🍓"]
    };

    // Sample recipes for ingredients
    const recipes = {
        chicken: ["Grilled Chicken Salad 🥗", "Chicken Stir-Fry 🍛"],
        avocado: ["Avocado Toast 🥑", "Guacamole & Chips 🥙"],
        banana: ["Banana Smoothie 🥤", "Banana Pancakes 🥞"]
    };

    let groceryList = [];

    /** 🥗 Generate Meal Plan **/
    window.generateMealPlan = function () {
        const dietType = document.getElementById("diet").value;
        const mealResults = document.getElementById("meal-results");
        
        if (mealPlans[dietType]) {
            mealResults.innerHTML = `<h3>Meal Plan for ${dietType.charAt(0).toUpperCase() + dietType.slice(1)}:</h3>`;
            mealPlans[dietType].forEach(meal => {
                mealResults.innerHTML += `<p>✅ ${meal}</p>`;
            });
        } else {
            mealResults.innerHTML = `<p>⚠️ No meal plan found. Try again!</p>`;
        }
    };

    /** 📜 Find Recipes **/
    window.generateRecipe = function () {
        const ingredient = document.getElementById("ingredient").value.toLowerCase();
        const recipeResults = document.getElementById("recipe-results");
        
        if (recipes[ingredient]) {
            recipeResults.innerHTML = `<h3>Recipes with ${ingredient}:</h3>`;
            recipes[ingredient].forEach(recipe => {
                recipeResults.innerHTML += `<p>🍽️ ${recipe}</p>`;
            });
        } else {
            recipeResults.innerHTML = `<p>⚠️ No recipes found for "${ingredient}". Try another ingredient!</p>`;
        }
    };

    /** 🛒 Add Items to Grocery List **/
    window.addToGroceryList = function (item) {
        if (!groceryList.includes(item)) {
            groceryList.push(item);
            updateGroceryList();
        }
    };

    /** 🛍️ Update Grocery List Display **/
    function updateGroceryList() {
        const cart = document.getElementById("cart");
        cart.innerHTML = "";
        groceryList.forEach(item => {
            cart.innerHTML += `<li>🛒 ${item} <button onclick="removeFromGroceryList('${item}')">❌</button></li>`;
        });
    }

    /** ❌ Remove Items from Grocery List **/
    window.removeFromGroceryList = function (item) {
        groceryList = groceryList.filter(i => i !== item);
        updateGroceryList();
    };

    /** ✅ Checkout Function (Clears List) **/
    window.checkout = function () {
        alert("✅ Order placed for: Chicken,Pepper,Vegetable Oil" + groceryList.join(", "));
        groceryList = [];
        updateGroceryList();
    };

    /** 🤖 AI Chatbot **/
    function addChatMessage(sender, message) {
        const chatBox = document.getElementById("chat-box");
        const msgDiv = document.createElement("div");
        msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        msgDiv.textContent = message;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }

    window.sendMessage = function () {
        const userInput = document.getElementById("chat-input").value.trim();
        if (userInput) {
            addChatMessage("user", userInput);
            respondToUser(userInput);
            document.getElementById("chat-input").value = ""; // Clear input
        }
    };

    function respondToUser(userMessage) {
        const lowerCaseMsg = userMessage.toLowerCase();
        let botResponse = "🤖 I'm not sure about that. Try asking about meal plans, recipes, or groceries!";
        // Greeting Responses
        if (lowerCaseMsg.includes("hello") || lowerCaseMsg.includes("hi") || lowerCaseMsg.includes("hey")) {
            botResponse = "Hello! 👋 How can I assist you with meal planning today?";
        } 
        else if (lowerCaseMsg.includes("how are you")) {
            botResponse = "I'm just a bot, but I'm here and ready to help! 😊 What do you need?";
        }

        // Meal Plan Queries
        else if (lowerCaseMsg.includes("meal plan")) {
            botResponse = "I can generate a meal plan for you! What type of diet do you prefer? (Vegan, Keto, Paleo)";
        } 
        else if (lowerCaseMsg.includes("vegan") || lowerCaseMsg.includes("keto") || lowerCaseMsg.includes("paleo")) {
            botResponse = `Great choice! Click on 'Generate Plan' to get a customized meal plan for the ${lowerCaseMsg} diet. 🍽️`;
        }

        // Recipe Queries
        else if (lowerCaseMsg.includes("recipe") || lowerCaseMsg.includes("cook") || lowerCaseMsg.includes("make")) {
            botResponse = "Looking for a recipe? Just enter an ingredient, and I'll find delicious meal ideas for you! 🍳";
        } 
        else if (lowerCaseMsg.includes("chicken") || lowerCaseMsg.includes("avocado") || lowerCaseMsg.includes("banana")) {
            botResponse = `Mmm... ${lowerCaseMsg} sounds delicious! Try entering it in the search bar to find related recipes. 🍽️`;
        }

        // Grocery List
        else if (lowerCaseMsg.includes("grocery") || lowerCaseMsg.includes("shopping list")) {
            botResponse = "Need groceries? Add items to your list, and I'll help you keep track of them! 🛒";
        } 
        else if (lowerCaseMsg.includes("add") && lowerCaseMsg.includes("list")) {
            botResponse = "Sure! Just click on an item to add it to your grocery list. ✅";
        }

        // Small Talk & Fun
        else if (lowerCaseMsg.includes("thank you") || lowerCaseMsg.includes("thanks")) {
            botResponse = "You're welcome! 😊 Let me know if you need more help.";
        } 
        else if (lowerCaseMsg.includes("bye") || lowerCaseMsg.includes("goodbye")) {
            botResponse = "Goodbye! Have a great meal! 🍽️";
        } 
        else if (lowerCaseMsg.includes("joke")) {
            botResponse = "Why did the tomato turn red? 🍅 Because it saw the salad dressing! 😂";
        } 

        // Default Response
        else {
            botResponse = "I'm not sure about that. Try asking about meal plans, recipes, or groceries! 😊";
}

// Delay response to simulate real conversation
setTimeout(() => addChatMessage("bot", botResponse), 1000);
    }
});
