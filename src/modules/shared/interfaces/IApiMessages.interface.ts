

enum EApiResponses {
	FAILED = 'failed',
	SUCCESS = 'success',
	SENT = 'sent!'
}

interface IApiMessage {
	message: EApiResponses
}

export {
	IApiMessage,
	EApiResponses
}