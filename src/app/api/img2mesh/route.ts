import { Client } from "@gradio/client";

// const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
// const exampleImage = await response_0.blob();
						
// const app = await client("TencentARC/InstantMesh");
// const result = await app.predict("/check_input_image", [
// 				exampleImage, 	// blob in 'Input Image' Image component
// 	]);

// console.log(result.data);

import { RequestImg2MeshType, RequestText2ImgType } from "@/helpers/types";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.REACT_APP_MY_TOKEN);

export async function POST(request: Request) {

    const req = await request.json() as RequestText2ImgType;

    const exampleImage0 = await hf.textToImage({
        inputs: req.message,
        model: 'stabilityai/stable-diffusion-2',
        parameters: {
            negative_prompt: 'blurry',
        }
        }, {
            // wait_for_model: true,
        }
        
    );

    // const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    // const exampleImage0 = await response_0.blob();
						
    const app = await Client.connect("TencentARC/InstantMesh");
    // const result = await app.predict("/preprocess", [
    //     exampleImage0, 	// blob in 'Input Image' Image component		
    //     true, // boolean  in 'Remove Background' Checkbox component
    // ]);

    // const url = ((result.data as unknown[])[0] as unknown as {url: string}).url as unknown as string
    // const response_1 = await fetch(url);
    // const exampleImage1 = await response_1.blob();

    const result2 = await app.predict("/generate_mvs", [
        exampleImage0, 	// blob in 'Processed Image' Image component		
        42, // number (numeric value between 30 and 75) in 'Sample Steps' Slider component		
        50, // number  in 'Seed Value' Number component
    ]);

    const url3 = ((result2.data as unknown[])[0] as unknown as {url: string}).url as unknown as string
    const response_3 = await fetch(url3);
    const exampleImage3 = await response_3.blob();

    const result3 = await app.predict("/make3d", [
        exampleImage3
	]);

    

console.log(result3);

    // return new Response(result3 as unknown as BodyInit);
    return Response.json({
        result: ((result3.data as unknown[])[1] as unknown as {url: string}).url as unknown as string
    })
};
