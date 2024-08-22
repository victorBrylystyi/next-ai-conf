// node.js env 

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id'); 

    return Response.json({ 
        text:'node.js env',
        id
     })
};


// export async function POST(req: Request) {
//     const body = await req.json();
//     // const response = await openai.chat.completions.create({
//     //   model: 'gpt-3.5-turbo',
//     //   stream: true,
//     //   messages,
//     // })
   
//     // const stream = OpenAIStream(response)
   
//     return Response.json({ 
//         body
//      })
//   }

