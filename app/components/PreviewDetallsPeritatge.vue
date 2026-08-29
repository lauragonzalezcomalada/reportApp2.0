<script setup>
import { parseDateText, parseActaType, today } from '../constants'


const props = defineProps({
  basicFormValue: {
    type: Object,
    required: true
  },
  mainDataFormValue: {
    type: Object,
    required: true
  },
  totals: {
    type: Object,
    required: true
  }
})

const basicFormValue = props.basicFormValue
const mainDataFormValue = props.mainDataFormValue
const totals = props.totals

const getDetailsText = () => {
  let text = ''
  switch (basicFormValue.tipologia) {
    case 'immobles':
      text = `Segons ${mainDataFormValue.tipusActa !== 'Altres' ?
        parseActaType(mainDataFormValue.tipusActa)
        : mainDataFormValue.tipusActaAltra} amb diligències número ${mainDataFormValue.diligencies} de data ${parseDateText(mainDataFormValue.dataDiligencies)}, se'ns indica els següents danys ocasionats a ${mainDataFormValue.tipusImmoble} situat a ${mainDataFormValue.adressa}: "...${mainDataFormValue.observacions}..."
        \nTenint en compte la descripció dels fets i desconeixent amb exactitud les parts afectades i la dimensió dels danys, s'estima el valor de la reparació havent verificat el pressupost aportat, que indica preus correctes, però es desconeix si ajustats als danys. Valor total de ${totals.total} € (IVA inclòs). 
        \nL' import total indicat es desglossa en els següents conceptes:
`
      break
    case 'vehicles':
      text = `Segons ${mainDataFormValue.tipusActa !== 'Altres' ?
        parseActaType(mainDataFormValue.tipusActa)
        : mainDataFormValue.tipusActaAltra} amb diligències número ${mainDataFormValue.diligencies} de data ${parseDateText(mainDataFormValue.dataDiligencies)}, se'ns indica els següents danys ocasionats al vehicle tipus ${mainDataFormValue.tipusVehicle} marca  ${mainDataFormValue.marcaVehicle}, model ${mainDataFormValue.modelVehicle}, amb plaques matrícula número ${mainDataFormValue.matriculaVehicle}; essent la seva descripció i ubicació dels danys que presenta el vehicle: "...${mainDataFormValue.observacions}..."
        \nLa que informa no havent verificat el vehicle, desconeixent amb exactitud les parts afectades i la dimensió dels danys, estima el valor de la reparació tenint en compte la descripció dels fets, així com els preus recomanats pel fabricant segons programa SoleraAuto en 0,00 € (IVA inclòs).  
        \nL'import total indicat es desglossa en els següents conceptes:`
      break
    case 'venal':
      text = `Valor venal a data ${today}, del vehicle tipus ${mainDataFormValue.tipusVehicle}, marca  ${mainDataFormValue.marcaVehicle}, model ${mainDataFormValue.modelVehicle}, amb plaques matrícula número ${mainDataFormValue.matriculaVehicle}, ${mainDataFormValue.altresDadesVehicle}. Desconeixent estat, s'estima el seu valor segons el Butlletí Estadístic Informatiu Ganvam en ${mainDataFormValue.valorEstimatVehicle} €`
      break
    case 'mobil':
      text = `Un ${mainDataFormValue.tipusDispositiu} marca ${mainDataFormValue.marcaDispositiu}; model ${mainDataFormValue.modelDispositiu}, data de llançament ${mainDataFormValue.dataLlancamentDispositiu}, preu de llançament ${mainDataFormValue.preuLlancamentDispositiu}. Desconeixent GB, estat i data de la compra, s'estima el seu valor havent realitzat una depreciació lineal mateix de la data de llançament al mercat a la data d'emissió d'informe, en la quantitat de ${mainDataFormValue.valorEstimatDispositiu} €`
      break
    case 'objectes':
      text = `Segons ${mainDataFormValue.tipusActa !== 'Altres' ?
        parseActaType(mainDataFormValue.tipusActa)
        : mainDataFormValue.tipusActaAltra} amb diligències número ${mainDataFormValue.diligencies} de data ${parseDateText(mainDataFormValue.dataDiligencies)}, se'ns indica: "...${mainDataFormValue.observacions}..." 
        \nPer emetre la indicada valoració es te en compte el tipus d’objecte, marca, model, estat i antiguitat. 
        \nCom es pot observar en cap d’aquests objectes se’ns indica la marca, el model, la data de la compra. 
        \nPer la qual cosa es procedeix a valorar els mateixos amb valors estimatius de segona mà. `
      break
    case 'patinet':
      text = `Segons ${mainDataFormValue.tipusActa !== 'Altres' ?
        parseActaType(mainDataFormValue.tipusActa)
        : mainDataFormValue.tipusActaAltra} amb diligències número ${mainDataFormValue.diligencies} de data ${parseDateText(mainDataFormValue.dataDiligencies)}, se'ns indica: "...${mainDataFormValue.observacions}..."  
        \n- Patinet elèctric amb número de sèrie ${mainDataFormValue.numeroSerieDispositiu}, marca ${mainDataFormValue.marcaDispositiu}, model ${mainDataFormValue.modelDispositiu}, data de llançament ${mainDataFormValue.dataLlancamentDispositiu}, preu de llançament ${mainDataFormValue.preuLlancamentDispositiu}. Ddesconeixent si al mateix li han fet els manteniments i revisions que corresponen i el seu estat  i antiguitat, es procedirà a realitzar una depreciació lineal de la data dels fets, estimant el seu valor en ${mainDataFormValue.valorEstimatVehicle} €`
      break
  }
  return text
}
</script>
<template>
  <div id="informacio-peritatge">
    <li class="ml-8">
      <ul class="mt-8 text-justify whitespace-pre-line">{{ getDetailsText() }}</ul>
    </li>
    <div v-if="basicFormValue.tipologia === 'immobles' || basicFormValue.tipologia === 'vehicles'"
      class="border-collapse border border-black mt-8 w-full">
      <div class="flex flex-row">
        <div class="w-3/4 p-8 flex flex-col">
          <div>
            - Material:
            <div class="flex justify-end">
              <div class="text-left">
                <div>I.V.A. 21%:</div>
                <div>TOTAL MATERIAL:</div>
              </div>
            </div>
          </div>
          <div class="mt-8">
            - Mà d’obra:
            <div class="flex justify-end">
              <div class="text-left">
                <div>I.V.A. 21%:</div>
                <div>TOTAL MATERIAL:</div>
              </div>
            </div>
          </div>
          <div class="mt-8 text-right">
            TOTAL MATERIAL + MÀ D’OBRA + I.V.A. :
          </div>
        </div>
        <div class="border-l border-black p-8 text-right w-1/4">
          <div>{{ totals.mat }} €</div>
          <div>{{ totals.matIva }} €</div>
          <div>{{ totals.matTotal }} €</div>


          <div class="mt-8">{{ totals.mo }} €</div>
          <div>{{ totals.moIva }} €</div>
          <div>{{ totals.moTotal }} €</div>


          <div class="mt-8">{{ totals.total }} €</div>
        </div>
      </div>
    </div>
    <div v-else-if="basicFormValue.tipologia === 'objectes'" class="mt-8">
      <div class="flex flex-col border border-black">
        <div class="bg-blue-200 items-center justify-center w-full text-center p-2 font-bold border-b border-black">
          OBJECTES
        </div>
        <div class="flex bg-gray-200 border-b  border-black">
          <div class="w-1/2 text-center font-bold border-r border-black p-2">
            DESCRIPCIÓ
          </div>
          <div class="w-1/2 text-center font-bold p-2">
            VALOR
          </div>
        </div>
        <div v-for="objecte in mainDataFormValue.objectes" :key="objecte.id" class="flex border-b border-black">
          <div class="w-1/2 p-2 border-r border-black">
            {{ objecte.name }}
          </div>
          <div class="w-1/2 p-2 text-end">
            {{ objecte.preu.toLocaleString('es-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) }} €
          </div>
        </div>
        <div class="flex font-bold">
          <div class="w-1/2 text-right p-2 border-r border-black">
            SUMAN...........

          </div>
          <div class="w-1/2 text-right p-2">
            {{mainDataFormValue.objectes.reduce((acc, objecte) => acc + objecte.preu, 0).toLocaleString('es-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}} €
          </div>
        </div>
      </div>
    </div>
    <p class="mt-8"> El perit que subscriu, estableix el present dictamen segons el seu lleial saber i
      entendre,
      sense
      perjudici que s'aportin <strong>fotografies originals</strong> on es pugui observar els danys amb
      exactitud i la <strong>factura</strong>
      (no pressupost) de la reparació, per si s’escau modificar el present informe. </p>
  </div>

</template>