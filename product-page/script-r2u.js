document.addEventListener('DOMContentLoaded', async (event) => {
    // init
    await R2U.init({ customerId: '613107e1975a06000949eeca' })
    const sku = 'GU364BE44XOLMOB-556401'
    const isActive = await R2U.sku.isActive(sku)

    if (!sku || !isActive) {
        document.getElementById('ar-button').remove()
        return
    }

    const fallbackOptions = {
        alertMessage: 'Sentimos muito, mas infelizmente seu dispositivo não é compatível com a visualização em Realidade Aumentada :(',
        fallback: 'full',
        text: {
            title: 'Dispositivo Incompatível',
            top: 'Lamentamos, mas infelizmente seu dispositivo é incompatível com a visualização em Realidade Aumentada.',
            bottom: 'Utilize o modelo 3D acima para inspecionar todos os detalhes do colchão Guldi!'
        }
    }

    const viewerPosition = document.getElementById('r2u-viewer')
    const poster = 'https://staging.guldi.com.br/wp-content/uploads/2021/09/3-casal-still-1.jpg'
    const progressBarColor = '#0C0E5A'

    const handler = await R2U.viewer.create({
        element: viewerPosition,
        popup: true,
        sku: sku,
        poster: poster,
        progressBarColor: progressBarColor
    })

    const node = document.getElementById('r2u-qrcode')
    const qrcode = await R2U.qrCode.create({
        element: node,
        sku: sku
    })

    // add open/close to modal
    document.getElementById('ar-button').addEventListener('click', (e) => {
        const modal = document.getElementById('modal')
        modal.hidden = !modal.hidden
    })

    if (window.innerWidth <= 999) {
        // if mobile
        // add behavior to button "veja na sua casa"
        jQuery(".modal").hide()
        jQuery(".see-at-home").show()
    }

    const arButton = document.getElementById('augmented-reality')

    var activeAR = await R2U.ar.attach({
        element: arButton,
        sku: sku,
        resize: true,
        showInstructions: 'always',
        fallbackOptions: fallbackOptions
    })

    jQuery('select[id="1-tamanho-do-colchao"]').on("change", () => {
        const selectedSize = jQuery("#1-tamanho-do-colchao :selected").text()
        let sku

        if (selectedSize.includes("Solteiro King")) {
            sku = 'GU364BE43XOMMOB-556402'
        } else if (selectedSize.includes("Solteiro")) {
            sku = 'GU364BE44XOLMOB-556401'
        } else if (selectedSize.includes("Casal")) {
            sku = 'GU364BE42XONMOB-556403'
        } else if (selectedSize.includes("Queen")) {
            sku = 'GU364BE41XOOMOB-556404'
        } else if (selectedSize.includes("King")) {
            sku = 'GU364BE40XOPMOB-556405'
        }

        handler.setSku(sku)
        qrcode.setSku(sku)
        activeAR.setSku(sku)
    })
})