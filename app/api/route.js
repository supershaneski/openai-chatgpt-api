import { Configuration, OpenAIApi } from "openai"

import { isEven } from "../../lib/utils"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
})

const openai = new OpenAIApi(configuration)

/**
 * API has 4096 max tokens but we are going to set out limit
 * to much lower. You can change this if you want.
 */
const MAX_TOKENS = 3072 // 1024 x 3

export async function POST(req) {

    const { system, prompt, previous } = await req.json()

    if(!prompt || !system) {
        return new Response('Bad Request', {
            status: 400,
        });
    }

    let messages = [ system ]

    let prev_data = previous
    
    let total_token_count = (JSON.stringify(messages)).length / 4
    if(prev_data.length > 0) total_token_count += (JSON.stringify(prev_data)).length / 4
    total_token_count += (JSON.stringify(prompt)).length / 4

    if(total_token_count > MAX_TOKENS) {

        /**
         * We will delete old entries from previous data.
         * We will delete about 1/3 of the entries.
         * This is just a very simple and crude way to ensure that we do not hit the maximum.
         */

        /**
         * This simple scheme will not work in the long run as the remaining 2/3
         * of the cutoff data can exceed the token count.
         * So I need to change this.
         */

        let cutoff = prev_data.length > 40 ? Math.ceil(prev_data.length - 20) : parseInt(prev_data.length / 3)
        cutoff = isEven(cutoff) ? cutoff : cutoff + 1

        prev_data = previous.slice(cutoff)

        const tmp_data_length = (JSON.stringify(prev_data)).length / 4

    }

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
    

    // test
    // reply = {role: 'assistant', content: 'Lorem ipsum dolor amet sidecus orange chocolate.' }

    /**
     * reply format: {role: 'assistant', content: 'Hello, world! ' }
     */
    
    return new Response(JSON.stringify({ reply }), {
        status: 200,
    })

}
