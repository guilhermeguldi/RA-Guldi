document.addEventListener('DOMContentLoaded', async (event) => { 
  // init
  await R2U.init({ customerId: '613107e1975a06000949eeca' })
  const sku = 'GU364BE40XOPMOB-556405'

  const isActive = R2U.sku.isActive(sku)

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

  if (window.innerWidth <= 999) {
    // if mobile
    // add behavior to button "veja na sua casa"
    const arArea = document.getElementById('r2u')
    arArea.innerHTML = ''
    const arButton = document.getElementById('button-ar')

    await R2U.ar.attach({
      element: arButton,
      sku,
      resize: true,
      showInstructions: 'always',
      fallbackOptions: fallbackOptions
    })
  } else {
    // if desktop
    // add viewer
    const viewerPosition = document.getElementById('r2u-viewer')
    const poster = 'https://staging.guldi.com.br/wp-content/uploads/2021/09/3-casal-still-1.jpg'
    const progressBarColor = '#0c0e5a'
    const buttonChangeSku = document.getElementById('change-sku')
    const handler = R2U.viewer.create({
      element: viewerPosition,
      popup: true,
      sku: sku,
      name,
      poster: poster,
      progressBarColor: progressBarColor
    })

    buttonChangeSku.addEventListener('click', () => {
      handler.setSku('RE000002')
    })

    jQuery('select[id="matress-size"]').on("change", () => {
      const selectedSize = $("#matress-size :selected").text()
      let sku

      if (selectedSize == 'solteiro') {
        sku = 'GU364UP34VFDMOB-624272'
      } else if (selectedSize == 'casal') {
        sku = 'GU364UP32VFFMOB-624274'
      } else if (selectedSize == 'king') {
        sku = 'GU364BE40XOPMOB-556405'
      }

      handler.setSku(sku)
    })

    // add qrcode
    const node = document.getElementById('r2u-qrcode')
    await R2U.qrCode.create({
      element: node,
      sku: sku
    })

    // add open/close to modal
    document.getElementById('ar-button').addEventListener('click', (e) => {
      const modal = document.getElementById('modal')
      modal.hidden = !modal.hidden
    })
  }
})

