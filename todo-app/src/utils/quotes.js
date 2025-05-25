// Collection of motivational quotes for productivity and task management
const productivityQuotes = [
  "The key to productivity is not to work harder, but to work smarter.",
  "Your daily choices become your destiny. Choose productivity.",
  "Focus on being productive instead of busy.",
  "Productivity is never an accident. It is always the result of a commitment to excellence.",
  "The way to get started is to quit talking and begin doing.",
  "Don't count the days, make the days count.",
  "You don't have to be great to start, but you have to start to be great.",
  "It's not about having time, it's about making time.",
  "Productivity is being able to do things that you were never able to do before.",
  "Start where you are. Use what you have. Do what you can.",
  "Simplicity boosts productivity. Eliminate the unnecessary.",
  "Progress is made by lazy people looking for easier ways to do things.",
  "The most effective way to do it, is to do it.",
  "Your mind is for having ideas, not holding them.",
  "Small progress is still progress.",
  "Productivity is less about what you do with your time and more about how you run your mind.",
  "If you spend too much time thinking about a thing, you'll never get it done.",
  "The only way to do great work is to love what you do.",
  "Until we can manage time, we can manage nothing else.",
  "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
  "Action is the foundational key to all success.",
  "Concentrate all your thoughts on the task at hand.",
  "Simplicity is the ultimate sophistication.",
  "Don't mistake activity with achievement.",
  "Eliminate the distractions. Focus on what matters."
];

// Function to get a random quote
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * productivityQuotes.length);
  return productivityQuotes[randomIndex];
};

export default productivityQuotes;
