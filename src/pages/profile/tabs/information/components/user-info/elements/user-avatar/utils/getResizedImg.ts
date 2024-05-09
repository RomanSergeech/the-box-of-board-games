
interface TGetCroppedImgArgs {
	img: HTMLImageElement
	imgWidth: number
	imgHeight: number
}

export const getResizedImg = ({ img, imgWidth, imgHeight }: TGetCroppedImgArgs): Promise<Blob> => {

	return new Promise(resolve => {

		const canvas: HTMLCanvasElement = document.createElement('canvas')
		const ctx = canvas.getContext('2d')!

		canvas.width = 500
		canvas.height = 500

		const canvasContainer = document.querySelector('.user_img_wrapper')
		canvasContainer?.appendChild(canvas)
	
		if ( imgWidth > imgHeight ) {
			const x = Math.ceil( (imgWidth - imgHeight) / 2 )
			ctx.drawImage(img, x, 0, imgHeight, imgHeight, 0, 0, 500, 500)
		}

		if (imgWidth < imgHeight) {
			const y = Math.ceil( (imgHeight - imgWidth) / 2 )
			ctx.drawImage(img, 0, y, imgWidth, imgWidth, 0, 0, 500, 500)
		}

		if (imgWidth == imgHeight) {
			ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, 500, 500)
		}

		canvas.toBlob((blob: any) => resolve(blob), "image/webp")

		canvasContainer?.removeChild(canvas)

	})
	
}