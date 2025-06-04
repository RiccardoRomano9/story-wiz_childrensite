# StoryWiz - AI Stories for Kids

StoryWiz is an interactive web application that helps children create unique stories using AI. The application integrates with the OpenRouter API to access the deepseek model for generating age-appropriate, creative stories.

## Features

- Interactive story creation form with inputs for protagonist name, story type, and additional notes
- Integration with OpenRouter API to access the deepseek model
- Story display with child-friendly formatting and visuals
- Story type selection with fun, visual category options (fantasy, action, adventure, etc.)
- Option to save or share generated stories
- Responsive design that works on all devices

## Getting Started

1. Clone this repository
2. Create a `.env` file based on `.env.example` and add your OpenRouter API key
3. Install dependencies with `npm install`
4. Start the development server with `npm run dev`

## API Configuration

To use the AI story generation feature, you'll need an API key from [OpenRouter](https://openrouter.ai/). Once you have your key, add it to the `.env` file:

```
VITE_OPENROUTER_API_KEY=your_api_key_here
```

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React for icons
- OpenRouter API (deepseek model)
  
## Try the App
Curious to see it in action?
Check out the live demo here 👉 https://beamish-cupcake-87dce3.netlify.app

Explore the features, test the interface, and see how it works in real time—no installation needed. Your feedback is always welcome!
## License

This project is licensed under the MIT License.
