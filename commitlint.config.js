/**
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-enum': [2, 'always', ['global', 'fe', 'be']],
		'scope-empty': [2, 'never'],
	},
}
