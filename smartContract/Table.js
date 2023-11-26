const address = '0x0d4fa82a6482f97CaE01A3f4921CcdEeA580d14E';
//
const abi = [
	{
		inputs: [
			{ internalType: 'string', name: '_appName', type: 'string' },
			{ internalType: 'string', name: '_releaseLabel', type: 'string' },
			{
				internalType: 'string[]',
				name: '_scriptIncludeList',
				type: 'string[]',
			},
			{ internalType: 'string[]', name: '_clientScriptList', type: 'string[]' },
			{
				internalType: 'string[]',
				name: '_businessRulesList',
				type: 'string[]',
			},
			{ internalType: 'int256', name: '_totalScriptIncludes', type: 'int256' },
			{ internalType: 'int256', name: '_totalClientScripts', type: 'int256' },
			{ internalType: 'int256', name: '_totalBusinessRules', type: 'int256' },
		],
		name: 'addApplicationData',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'string', name: '_appName', type: 'string' },
			{ internalType: 'string', name: '_releaseLabel', type: 'string' },
			{ internalType: 'string', name: '_companyName', type: 'string' },
			{
				internalType: 'string[]',
				name: '_scriptIncludeList',
				type: 'string[]',
			},
			{ internalType: 'string[]', name: '_clientScriptList', type: 'string[]' },
			{
				internalType: 'string[]',
				name: '_businessRulesList',
				type: 'string[]',
			},
			{
				internalType: 'string[]',
				name: '_extraScriptIncludeList',
				type: 'string[]',
			},
			{
				internalType: 'string[]',
				name: '_extraClientScriptList',
				type: 'string[]',
			},
			{
				internalType: 'string[]',
				name: '_extraBusinessRulesList',
				type: 'string[]',
			},
		],
		name: 'addCompareResultData',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'applications',
		outputs: [
			{ internalType: 'string', name: 'appName', type: 'string' },
			{ internalType: 'string', name: 'releaseLabel', type: 'string' },
			{ internalType: 'int256', name: 'totalScriptIncludes', type: 'int256' },
			{ internalType: 'int256', name: 'totalClientScripts', type: 'int256' },
			{ internalType: 'int256', name: 'totalBusinessRules', type: 'int256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'comparedResult',
		outputs: [
			{ internalType: 'string', name: 'appName', type: 'string' },
			{ internalType: 'string', name: 'releaseLabel', type: 'string' },
			{ internalType: 'string', name: 'companyName', type: 'string' },
			{ internalType: 'uint256', name: 'timestamp', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getAllComparedResults',
		outputs: [
			{
				components: [
					{ internalType: 'string', name: 'appName', type: 'string' },
					{ internalType: 'string', name: 'releaseLabel', type: 'string' },
					{ internalType: 'string', name: 'companyName', type: 'string' },
					{
						internalType: 'string[]',
						name: 'scriptIncludeList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'clientScriptList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'businessRulesList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'extraScriptIncludeList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'extraClientScriptList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'extraBusinessRulesList',
						type: 'string[]',
					},
					{ internalType: 'uint256', name: 'timestamp', type: 'uint256' },
				],
				internalType: 'struct ApplicationDataStorage.CompareResultData[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
		name: 'getApplication',
		outputs: [
			{
				components: [
					{ internalType: 'string', name: 'appName', type: 'string' },
					{ internalType: 'string', name: 'releaseLabel', type: 'string' },
					{
						internalType: 'string[]',
						name: 'scriptIncludeList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'clientScriptList',
						type: 'string[]',
					},
					{
						internalType: 'string[]',
						name: 'businessRulesList',
						type: 'string[]',
					},
					{
						internalType: 'int256',
						name: 'totalScriptIncludes',
						type: 'int256',
					},
					{
						internalType: 'int256',
						name: 'totalClientScripts',
						type: 'int256',
					},
					{
						internalType: 'int256',
						name: 'totalBusinessRules',
						type: 'int256',
					},
				],
				internalType: 'struct ApplicationDataStorage.ApplicationData',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'string', name: '_releaseLabel', type: 'string' },
			{ internalType: 'string', name: '_appName', type: 'string' },
		],
		name: 'getApplicationByReleaseAndName',
		outputs: [
			{ internalType: 'string', name: '', type: 'string' },
			{ internalType: 'string', name: '', type: 'string' },
			{ internalType: 'string[]', name: '', type: 'string[]' },
			{ internalType: 'string[]', name: '', type: 'string[]' },
			{ internalType: 'string[]', name: '', type: 'string[]' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getApplicationCount',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'string', name: '_releaseLabel', type: 'string' },
			{ internalType: 'string', name: '_companyName', type: 'string' },
			{ internalType: 'string', name: '_appName', type: 'string' },
		],
		name: 'getComparedResultForReleaseComNameAppName',
		outputs: [
			{ internalType: 'string', name: '', type: 'string' },
			{ internalType: 'string', name: '', type: 'string' },
			{ internalType: 'string', name: '', type: 'string' },
			{ internalType: 'string[]', name: '', type: 'string[]' },
			{ internalType: 'string[]', name: '', type: 'string[]' },
			{ internalType: 'string[]', name: '', type: 'string[]' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
];
module.exports = { address, abi };
