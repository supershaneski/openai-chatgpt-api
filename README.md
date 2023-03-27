openai-chatgpt-api
=====

This is sample interactive storytelling narrative chatbot application using [ChatGPT API](https://platform.openai.com/docs/guides/chat), powered by `gpt-3.5-turbo`, OpenAI’s advanced language model, built using [Next 13](https://nextjs.org/), the React framework.

If you have had the opportunity to use either [ChatGPT](https://chat.openai.com/) or `Bing Chat`, you would have likely realized the vast potential for implementation, spanning from productivity tools to storytelling. These chat platforms can enhance work efficiency while also providing hours of entertainment. With this in mind, I have created a UI that prioritizes the art of storytelling. 

---

これは、ChatGPT APIを使用したサンプルのインタラクティブなストーリーテリング・ナラティブ・チャットボットWebアプリケーションです。このアプリケーションは、OpenAIが高度な言語モデル、gpt-3.5-turboを使用しています。また、ReactフレームワークのNext.js 13を使用して構築されています。

もしChatGPTまたはBing Chatを使用したことがあるなら、生産性ツールからストーリーテリングまで、さまざまな可能性があることに気づいたはずです。これらのチャットプラットフォームは、作業効率を向上させるだけでなく、数時間のエンターテインメントを提供することができます。そこで、私はストーリーテリングの芸術に重点を置いたUIを作成しました。


# Motivation

This app aims to provide a simple and convenient user interface to facilitate interactive storytelling narration with a chatbot. 

This is like an advanced `imaginative play` when we were kids where we use our imagination to create scenarios with toys or other objects, talking to them as if they are alive.

I have not played `Dungeons & Dragons` but you can probably also use this app to play it with your own backstory and scenarios.


# Sample

There two sample stories with scenes and characters included for testing, `The Wonderful Wizard of Oz` and `LOTR`.



# Prompt Design

The basic [chat completion](https://platform.openai.com/docs/guides/chat/introduction) API call looks like this:

```javascript
openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]
)
```

The `system prompt` gives the AI the instruction how to respond.

```javascript
{"role": "system", "content": "You are a helpful assistant."}
```

The message format the user sends is this:

```javascript
{"role": "user", "content": "Who won the world series in 2020?"},
```

and the expected response is like this:

```javascript
{"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."}
```

Keeping all these in mind, we will be designing the `system prompt` to simulate conversation between the user and AI with storytelling narrative in mind.

Here is the basic format:

```javascript
[Character Prompt] /* required */

[Story Prompt]

[Scene Prompt]

[Scene Character Prompt]

[User Prompt]

[Scene User Prompt]
```

We can omit everything, except the `character prompt`. It should be as simple description as possible to enable the AI to generate more creative response.

If the story is well known, like from a book, movie or other popular media, we can omit the `story prompt` since we are assuming that whatever data GPT-3.5 is trained on probably included it so there is no need to add it.

The `scene prompt` lays out the particular scenario from our main story to restrict the conversation within that bounds. Otherwise, the API might refer to scenes that will happen further in the story.

In any story, there is the so called `character development` which tracks the character's growth as the story progresses. This is where the `scene character prompt` comes in to focus on the character's current state at that particular scene.

`User prompt` lays out the identity of the user (you) for the AI to respond with. You can omit this if you just want to interact with the AI's character. Like in `scene character prompt`, the `scene user prompt` gives context to the AI about the user (you) at that particulat scene.

To have the best interaction and generate good response from the AI, it is better to use the `zero shot` approach when writing the prompts. You do not want to spill all the beans to the AI and give all contexts in one go. We just want to sway them in certain direction with as few nudgings as possible without revealing all the details of the story or scenes. We want the AI not to generate canned response but to be more creative in its response.

> (Translation: You are Lady Fujitsubo, a character from "The Tale of Genji," who has been reincarnated and is now living in modern-day Japan. You have adjusted well to modern society and are having a conversation with a friend. Please conduct the conversation entirely in Japanese.)


# Token Management

For `gpt-3.5-turbo-0301`, the maximum limit is 4096 tokens.


# Installation

Clone the repository and install the dependencies

```sh
git clone https://github.com/supershaneski/openai-chatgpt-api.git myproject

cd myproject

npm install
```

Copy `.env.example` and rename it to `.env` then edit the `OPENAI_APIKEY` and use your own `OpenAI API key`

```javascript
OPENAI_APIKEY=YOUR_OWN_API_KEY
```

If you have not yet done so, upon signing up for OpenAI account you will be given `$18 in free credit that can be used during your first 3 months`. Visit the [OpenAI website](https://platform.openai.com/) for more details.

Now, to run the app

```sh
npm run dev
```

Open your browser to `http://localhost:3005/` to load the application page.

