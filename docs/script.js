window.addEventListener('load', main)

function main() {
	intersecter()
}

function intersecter() {
	const iObserver = new IntersectionObserver(cb, {
		threshold: [0.9, 0],
	})

	document.querySelectorAll('article').forEach(article => iObserver.observe(article))

	function cb(entries) {
		entries.forEach(entry => {
			entry.target.classList[entry.intersectionRatio > 0.9 ? 'add' : 'remove']('intersecting')
			console.log(entry.target.dataset?.look)
			if (entry.target.dataset.look) lookArticle(entry.intersectionRatio)
		})
	}
}

let lookArticleTimeout

function lookArticle(ratio) {
	if (ratio > 0.9 && typeof lookArticleTimeout !== 'number')
		lookArticleTimeout = setTimeout(() => {
			document.querySelector('article[data-look]').classList.add('look')
		}, 3000)
	else if (ratio <= 0.9 && typeof lookArticleTimeout === 'number') {
		clearTimeout(lookArticleTimeout)
		document.querySelector('article[data-look]').classList.remove('look')
		lookArticleTimeout = null
	}
}
