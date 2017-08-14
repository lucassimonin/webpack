import * as obj from './log.js'

let a = 'Bonjour'

obj.log2(a)

document.getElementById('button').addEventListener('click', function() {
    import('jquery').then(($) => {
        $('body').css('backgroundColor', '#000')
    })
})

