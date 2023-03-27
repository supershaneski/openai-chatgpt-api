import { cookies, headers } from 'next/headers'
import { Configuration, OpenAIApi } from "openai"

import { getUniqueId } from '../../lib/utils'


const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
})

const openai = new OpenAIApi(configuration)

const sessionId = getUniqueId()

//let saved_data = []

export async function POST(req) {

    const { system, prompt, previous } = await req.json()

    if(!prompt || !system) {
        return new Response('Bad Request', {
            status: 405,
        });
    }

    let messages = [ system ]

    if(previous.length > 0) {

        const _tmp = JSON.stringify(previous)
        const _token_count = _tmp.length / 4
        console.log("[prev count]", parseInt(_token_count))

        messages = messages.concat(previous)
    }

    messages = messages.concat(prompt)

    const tmp = JSON.stringify(messages)
    const token_count = tmp.length / 4
    console.log("[token count]", parseInt(token_count))

    //console.log(system)
    //console.log(prompt)

    /*
    messages: [
        {role: "system", content: "You are Doraemon, the robot cat. You will act and respond like Doraemon."},
        {role: "user", content: msg},
    ],*/

    let reply = null
    let errorFlag = false

    try {

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.5,
            max_tokens: 1024, //4096 - prompt tokens
        });
    
        reply = completion.data.choices[0].message

    } catch(err) {

        console.log(err)
        errorFlag = true

    }

    if(errorFlag) {

        return new Response(JSON.stringify({ reply:
            {role: 'assistant', content: "Error something" }
        }), {
            status: 200,
        })

    }

    //console.log(reply)

    //const reply = {role: 'assistant', content: (new Date()).toLocaleTimeString() }
    //saved_data.push(reply)

    //const reply = {role: 'assistant', content: 'Hello, world! ' + (new Date()).toLocaleTimeString() }

    return new Response(JSON.stringify({ reply }), {
        status: 200,
    })

}
