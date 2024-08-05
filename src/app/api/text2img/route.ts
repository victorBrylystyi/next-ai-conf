import { RequestText2ImgType } from "@/helpers/types";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.REACT_APP_MY_TOKEN);

export async function POST(request: Request) {

    const req = await request.json() as RequestText2ImgType;

    const blob = await hf.textToImage({
        inputs: req.message,
        model: 'stabilityai/stable-diffusion-2',
        parameters: {
            negative_prompt: 'blurry',
        }
        }, {
            // wait_for_model: true,
        }
        
    );

    return new Response(blob);
};

	//parameters?: {
		/**
		 * An optional negative prompt for the image generation
		 */
		//negative_prompt?: string;
		/**
		 * The height in pixels of the generated image
		 */
		//height?: number;
		/**
		 * The width in pixels of the generated image
		 */
		//width?: number;
		/**
		 * The number of denoising steps. More denoising steps usually lead to a higher quality image at the expense of slower inference.
		 */
		//num_inference_steps?: number;
		/**
		 * Guidance scale: Higher guidance scale encourages to generate images that are closely linked to the text `prompt`, usually at the expense of lower image quality.
		 */
		//guidance_scale?: number;
	//};
