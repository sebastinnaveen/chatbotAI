export interface Result {
	action: string;
	resolvedQuery: string;
	score: 	number;
	source: string;
	fulfillment: {
		speech: string;
	};
	metadata? :{};
	parameters: {
		simplified: string;
	};
	
}