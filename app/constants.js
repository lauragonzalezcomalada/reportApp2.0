import {
  Document,
  Paragraph,
  Table,
  AlignmentType,
  ImageRun,
  WidthType,
  TableRow,
  TableCell,
  BorderStyle,
  TextRun
} from 'docx'

export const TIPOLOGIA_OPTIONS = [
  { label: 'Immobles', value: 'immobles' },
  { label: 'Vehícles', value: 'vehicles' },
  { label: 'Objectes', value: 'objectes' },
  { label: 'Venal', value: 'venal' },
  { label: 'Mòbil', value: 'mobil' },
  { label: 'Patinet', value: 'patinet' }
]

export const IMMOBLES_DADES = {
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: '',
  tipusImmoble: '',
  adressa: '',
  material: 0,
  maObra: 0
}

export const VEHICLES_DADES = {
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: '',
  tipusVehicle: '',
  marcaVehicle: '',
  modelVehicle: '',
  matriculaVehicle: '',
  altresDadesVehicle: '',
  valorEstimatVehicle: 0,
  adressa: '',
  material: 0,
  maObra: 0
}

export const OBJECTES_DADES = {
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: ''
}

export const VENAL_DADES = {
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: '',
  tipusVehicle: '',
  marcaVehicle: '',
  modelVehicle: '',
  matriculaVehicle: '',
  altresDadesVehicle: '',
  valorEstimatVehicle: 0
}

export const MOBIL_DADES = {
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: '',
  tipusDispositiu: '',
  marcaDispositiu: '',
  modelDispositiu: '',
  numeroSerieDispositiu: '',
  dataLlancamentDispositiu: '',
  preuLlancamentDispositiu: 0
}

export const PATINET_DADES = {
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: '',
  tipusVehicle: '',
  marcaVehicle: '',
  modelVehicle: '',
  matriculaVehicle: '',
  altresDadesVehicle: '',
  valorEstimatVehicle: 0
}

export const tipusPeritatge = tipologia => {
  switch (tipologia) {
    case 'immobles':
      return 'Danys a bens immobles / Instal·lacions / Altres'
    case 'vehicles':
      return 'Danys a vehicles / Instal·lacions / Altres'
    case 'objectes':
      return 'Danys a objectes / Instal·lacions / Altres'
    case 'venal':
      return 'Venal'
    case 'mobil':
      return 'Mòbil'
    case 'patinet':
      return 'Patinet'
  }
}

export const tipusPeritatgeHeader = tipologia => {
  switch (tipologia) {
    case 'immobles':
      return 'DANYS A IMMOBLES'
    case 'vehicles':
      return 'DANYS A VEHICLE'
    case 'objectes':
      return "D'OBJECTES"
    case 'venal':
      return 'VALOR VENAL DE VEHICLE'
    case 'mobil':
      return "D'OBJECTE (Telèfon mòbil)"
    case 'patinet':
      return "D'OBJECTE (Patinet elèctric)"
  }
}

export const parseDateText = date => {
  const dateText = date
    ? new Date(date)
        .toLocaleDateString('ca-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        .replace(',', '')
    : null
  return dateText
}

export const formatJutjatHeader = (jutjat, numeroJutjat, llocJutjat) => {
  return `${jutjat.toUpperCase()} Nº ${numeroJutjat} ${llocJutjat.toUpperCase()} `
}

export const parseDate = date => {
  return date
    ? new Date(date)
        .toLocaleDateString('ca-ES', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
        .replace(',', '')
    : ''
}

export const formatJutjatBody = (jutjat, numeroJutjat, llocJutjat) => {
  return `${jutjat} núm.${numeroJutjat} (${llocJutjat})`
}

export const parseActaType = tipusActa => {
  switch (tipusActa) {
    case 'danys_immobles':
      return 'Acta de comprovació de danys a immobles'
    case 'danys_vehicles':
      return 'Acta de comprovació de danys a vehicles'
    case 'comprovacio_ocular':
      return 'Acta de comprovació ocular'
    case 'manifestacio':
      return 'Acta de Manifestació'
    case 'diligencies':
      return 'Diligències'
    case 'llista_sostrets_perduts':
      return 'Llista d’objectes sostrets/perduts '
    case 'altres':
      return 'Altres'
    default:
      return tipusActa
  }
}

export const today = new Date()
  .toLocaleDateString('ca-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  .replace(',', '')

const loadPng = async path => {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`No se ha podido cargar ${path}: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('image/png')) {
    throw new Error(`${path} no ha devuelto un PNG. Content-Type recibido: ${contentType}`)
  }

  return new Uint8Array(await response.arrayBuffer())
}

export const generateDocx = async (
  basicFormValue,
  mainDataFormValue,
  provissioFormValue,
  totals
) => {
  const [apejucBuffer, spcBuffer, firmaBuffer] = await Promise.all([
    loadPng('/logo_APEJUC.png'),
    loadPng('/logo_SPC.png'),
    loadPng('/firma.png')
  ])

  console.log({
    apejucBytes: apejucBuffer.byteLength,
    spcBytes: spcBuffer.byteLength,
    firmaBytes: firmaBuffer.byteLength
  })

  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Tahoma',
            size: 24
          },
          paragraph: {
            spacing: {
              line: 360
            }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 500,
              right: 1200,
              bottom: 1000,
              left: 1200
            }
          }
        },
        children: [
          new Table({
            borders: {
              top: {
                style: BorderStyle.NONE,
                size: 0,
                color: 'FFFFFF'
              },
              bottom: {
                style: BorderStyle.NONE,
                size: 0,
                color: 'FFFFFF'
              },
              left: {
                style: BorderStyle.NONE,
                size: 0,
                color: 'FFFFFF'
              },
              right: {
                style: BorderStyle.NONE,
                size: 0,
                color: 'FFFFFF'
              },
              insideHorizontal: {
                style: BorderStyle.NONE,
                size: 0,
                color: 'FFFFFF'
              },
              insideVertical: {
                style: BorderStyle.NONE,
                size: 0,
                color: 'FFFFFF'
              }
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new ImageRun({
                            type: 'png',
                            data: apejucBuffer,
                            transformation: {
                              width: 180,
                              height: 100
                            }
                          })
                        ]
                      })
                    ]
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new ImageRun({
                            type: 'png',
                            data: spcBuffer,
                            transformation: {
                              width: 180,
                              height: 120
                            }
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 360
            },
            children: [
              new TextRun({
                text: 'INFORME PERICIAL EMÈS PEL PERIT TAXADOR JUDICIAL',
                bold: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 360
            },
            children: [
              new TextRun({
                text: formatJutjatHeader(
                  basicFormValue.jutjat,
                  basicFormValue.numeroJutjat,
                  basicFormValue.llocJutjat
                ),
                bold: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 360
            },
            children: [
              new TextRun({
                text: basicFormValue.tipus.toUpperCase() + ' Nº ' + basicFormValue.identificador,
                bold: true
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 360
            },
            children: [
              new TextRun({
                text: 'PERP Nº ' + basicFormValue.perp,
                bold: true
              })
            ],
            bold: true
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 360
            },
            text: 'Girona, ' + today
          }),
          new Paragraph({
            text: '',
            spacing: {
              after: 360
            }
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,

            spacing: {
              line: 360
            },

            children: [
              new TextRun({
                text: 'Davant el/la jutge/essa, i del/la secretari/ària judicial, compareix '
              }),

              new TextRun({
                text: 'SERVEIS PERICIALS COMALADA, S.L. ',
                bold: true
              }),

              new TextRun({
                text: 'entitat col·laboradora amb l’Administració de Justícia de la Generalitat de Catalunya,  representada en aquets acte per la Sra. Pilar Comalada Muñoz, Perit Taxador Judicial nº 676, major d’edat i d’identificació coneguda, especialista en bens mobles, immobles, vehicles, danys diversos, “Especialista Universitari en Perit Taxador Judicial” per la “Universitat Alcalá de Henares”, “Perit Judicial d’Investigació Mercantil”, “Agent Immobiliari i Gestor de la Propietat”; membre de “L’Associació de Perits Judicials de Catalunya APEJUC”, associat nº 2; '
              }),

              new TextRun({
                text: "EXPERTS INDEPENDENTS EN QUANTIFICACIÓ DE VALORS DE BÉNS I DANYS, PER A CONCILIACIONS I MEDIACIONS, D'ACORD A LA LLEI ORGÀNICA 1/2025,",
                italic: true
              }),

              new TextRun({
                text: 'i advertida pel Sr. Jutge de l’obligació que ha de dir la veritat i de les penes de les quals el Codi Penal castiga el delicte de fals testimoni en una causa criminal, se li fan les preguntes pertinents i MANIFESTA: Que assabentat del càrrec per al qual se l’ha nomenat, l’accepta i jura o promet exercir-lo bé i d’una manera fidel conforme al seu saber. Tot seguit, emet l’informe que es transcriu a continuació: '
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              before: 360,
              after: 360
            },
            children: [
              new TextRun({
                text: 'Data de la sol·licitud per realització del dictamen pericial: ',
                bold: true
              }),

              new TextRun({
                text: parseDate(basicFormValue.dataSolicitud),
                bold: true,
                break: 1
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 360
            },
            children: [
              new TextRun({
                text: `"...Us comuniquem que heu estat designat/ada com a perit per al procediment ${basicFormValue.identificador} del Jutjat d’ Instrucció núm. ${basicFormValue.numeroJutjat} (${basicFormValue.llocJutjat})..."`,
                bold: true,
                break: 1
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 360
            },
            children: [
              new TextRun({
                text: `"...La referència de la designació és ${basicFormValue.perp}..."`,
                bold: true,
                break: 1
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 360
            },
            children: [
              new TextRun({
                text: `"...La tipologia del peritatge correspon a: ${tipusPeritatge(basicFormValue.tipologia)}..."`,
                bold: true,
                break: 1
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 360
            },
            children: [
              new TextRun({
                text: `INDICAR QUE LA TIPOLOGIA D’AQUEST INFORME PERICIAL ES DE ${tipusPeritatgeHeader(basicFormValue.tipologia)}`,
                bold: true,
                break: 1,
                underline: {
                  type: 'single'
                }
              })
            ]
          }),

          /* basicFormValue.value.provissio ? new Paragraph({
             alignment: AlignmentType.JUSTIFIED,
             spacing: {
               line: 360,
               after: 360,
             },
             children: [
               new TextRun({
                 text: `PROVISSIÓ DE/LA ${provissioFormValue.value.tipusProvissio !== 'Altres' ?
                   provissioFormValue.value.tipusProvissio.toUpperCase() : provissioFormValue.value.altreTipus.toUpperCase()} - ${parseDate(provissioFormValue.value.dataProvissio)}`,
                 bold: true,
               }),
               new TextRun({
                 text: `"...${provissioFormValue.value.observacions}..."`,
                 bold: true,
                 break: 1,
               }),
             ],
           }) : '',
 */
          ...(basicFormValue.provissio
            ? [
                new Paragraph({
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    line: 360,
                    after: 360
                  },
                  children: [
                    new TextRun({
                      text: `PROVISIÓ DE/LA ${
                        provissioFormValue.tipusProvissio !== 'Altres'
                          ? provissioFormValue.tipusProvissio.toUpperCase()
                          : provissioFormValue.altreTipus.toUpperCase()
                      } - ${parseDate(provissioFormValue.dataProvissio)}`,
                      bold: true
                    }),
                    new TextRun({
                      text: `«${provissioFormValue.observacions}»`,
                      bold: true,
                      break: 1
                    })
                  ]
                })
              ]
            : []),
          new Paragraph({
            bullet: {
              level: 0
            },
            spacing: {
              line: 360
            },

            children: [
              new TextRun({
                text: `Segons ${
                  mainDataFormValue.tipusActa !== 'Altres'
                    ? mainDataFormValue.tipusActa
                    : mainDataFormValue.tipusActaAltra
                } amb diligències número ${mainDataFormValue.diligencies} de data ${parseDateText(mainDataFormValue.dataDiligencies)}, se'ns indica els següents danys ocasionats a ${mainDataFormValue.tipusImmoble} situat a ${mainDataFormValue.adressa}: "...${mainDataFormValue.observacions}..."`
              })
            ]
          }),
          new Paragraph({
            spacing: {
              line: 360,
              before: 360
            },
            children: [
              new TextRun({
                text: `Tenint en compte la descripció dels fets i desconeixent amb exactitud les parts afectades i la dimensió dels danys, s’estima el valor de la reparació havent verificat el pressupost aportat, que indica preus correctes, però es desconeix si ajustats als danys. Valor total de `
              }),
              new TextRun({
                text: `${totals.total} `,
                bold: true
              }),
              new TextRun({
                text: `€ (IVA inclòs).`
              })
            ]
          }),

          new Paragraph({
            spacing: {
              line: 360,
              after: 360
            },
            children: [
              new TextRun({
                text: 'L’ import total indicat es desglossa en els següents conceptes: '
              })
            ]
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },

            borders: {
              top: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: '000000'
              },
              bottom: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: '000000'
              },
              left: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: '000000'
              },
              right: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: '000000'
              },
              insideVertical: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: '000000'
              },
              insideHorizontal: {
                style: BorderStyle.NONE
              }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    margins: {
                      top: 400,
                      bottom: 400,
                      left: 400,
                      right: 400
                    },
                    width: {
                      size: 60,
                      type: WidthType.PERCENTAGE
                    },

                    children: [
                      new Paragraph({
                        spacing: { after: 300 },
                        children: [
                          new TextRun({
                            text: '-     Material:'
                          })
                        ]
                      }),

                      new Paragraph({
                        spacing: { after: 300 },
                        alignment: AlignmentType.RIGHT,
                        text: 'I.V.A. 21%:'
                      }),

                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { after: 600 },

                        text: 'TOTAL MATERIAL:'
                      }),

                      new Paragraph({
                        spacing: { after: 300 },
                        children: [
                          new TextRun({
                            text: '-     Mà d’obra:'
                          })
                        ]
                      }),

                      new Paragraph({
                        spacing: { after: 300 },
                        alignment: AlignmentType.RIGHT,
                        text: 'I.V.A. 21%:'
                      }),

                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { after: 600 },

                        text: 'TOTAL MÀ D’OBRA:'
                      }),

                      new Paragraph({
                        alignment: AlignmentType.CENTER,

                        children: [
                          new TextRun({
                            text: 'TOTAL MATERIAL + MÀ D’OBRA + I.V.A. :'
                          })
                        ]
                      })
                    ]
                  }),

                  new TableCell({
                    width: {
                      size: 40,
                      type: WidthType.PERCENTAGE
                    },
                    margins: {
                      top: 400,
                      bottom: 400,
                      left: 400,
                      right: 400
                    },

                    children: [
                      new Paragraph({
                        spacing: { after: 300 },
                        alignment: AlignmentType.RIGHT,
                        text: ` ${totals.mat} €`
                      }),

                      new Paragraph({
                        spacing: { after: 300 },
                        alignment: AlignmentType.RIGHT,
                        text: ` ${totals.matIva} €`
                      }),

                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { after: 600 },
                        text: ` ${totals.matTotal} €`
                      }),

                      new Paragraph({
                        spacing: { after: 300 },
                        alignment: AlignmentType.RIGHT,
                        text: ` ${totals.mo} €`
                      }),

                      new Paragraph({
                        spacing: { after: 300 },
                        alignment: AlignmentType.RIGHT,
                        text: ` ${totals.moIva} €`
                      }),

                      new Paragraph({
                        spacing: { after: 600 },
                        alignment: AlignmentType.RIGHT,
                        text: ` ${totals.moTotal} €`
                      }),

                      new Paragraph({
                        alignment: AlignmentType.RIGHT,

                        children: [
                          new TextRun({
                            text: ` ${totals.total} €`
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              before: 400,
              line: 360
            },
            children: [
              new TextRun({
                text: "El perit que subscriu, estableix el present dictamen segons el seu lleial saber i entendre, sense perjudici que s'aportin "
              }),
              new TextRun({
                text: 'fotografies originals ',
                bold: true
              }),
              new TextRun({
                text: 'on es pugui observar els danys amb exactitud i la '
              }),
              new TextRun({
                text: 'factura ',
                bold: true
              }),
              new TextRun({
                text: '(no pressupost) de la reparació, per si s’escau modificar el present informe. '
              }),
              new TextRun({
                text: 'Per a constatació, estenc aquesta acta. El pèrit s’aferma en el seu contingut i el ratifica. Com a prova de conformitat, la signa juntament amb el/la Sr./a. Jutge/essa. En dono fe. '
              })
            ]
          }),
          new Paragraph({
            spacing: {
              before: 400,
              line: 360
            },
            children: [
              new TextRun({
                text: '**TOTAL HONORARIS PERIT 70,00 €** ',
                bold: true,
                break: 1
              }),
              new TextRun({
                text: '**HONORARIS FACTURATS A LA GENERALITAT 40,00 €** ',
                bold: true,
                break: 1
              }),
              new TextRun({
                text: '**HONORARIS PENDENTS DE COBRAR A TAXACIÓ DE COSTES 70,00 €** ',
                bold: true,
                break: 1
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new ImageRun({
                type: 'png',
                data: firmaBuffer,
                transformation: {
                  width: 180,
                  height: 140
                }
              })
            ]
          })
        ]
      }
    ]
  })
}
