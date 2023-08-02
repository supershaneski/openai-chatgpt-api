import { Configuration, OpenAIApi } from "openai"

import { trim_array } from "../../lib/utils"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req) {

    const { system, prompt, previous } = await req.json()

    if(!prompt || !system) {
        return new Response('Bad Request', {
            status: 400,
        });
    }

    let messages = [ system ]

    let prev_data = trim_array(previous, 15) // just maintain last 15 entries as history
    
    if(prev_data.length > 0) {

        messages = messages.concat(prev_data)
    }

    messages = messages.concat(prompt)
    
    let reply = null
    let errorFlag = false
    
    try {

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.5,
            max_tokens: 1024, // 4096 - max prompt tokens
        });
    
        reply = completion.data.choices[0].message

    } catch(err) {

        console.log(err)
        errorFlag = true

    }

    if(errorFlag) {

        return new Response(JSON.stringify({ reply:
            {role: 'assistant', content: "Oops, an error occured." }
        }), {
            status: 200,
        })

    }
    
    // reply = {role: 'assistant', content: 'Lorem ipsum dolor amet sidecus orange chocolate.' }

    return new Response(JSON.stringify({ reply }), {
        status: 200,
    })

}
