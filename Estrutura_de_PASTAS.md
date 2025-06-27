# 23/06/25
ESTRUTURA DE PASTAS

## EXISTENTE 

| **COLUNA A:** EXISTE HOJE 		+ COMENTÁRIOS |

### **📁 RAIZ DO PROJETO**
| **Existente no GitHub** (atua-   		|  ** + Comentários**
| lizado na data) X  

| `GFauto/` 											| 
| `├── app/` 										|  Pasta principal do Next.js |
| `├── backups/` 								|  Conforme política do MEMORIADESESSAO |
| `├── components/` 							|  Componentes globais |
| `├── docs/` 										|  Documentação |
| `├── GFauto/` 									| 
| `├── lib/` 											|  Bibliotecas e utilitários |
| `├── memoria/` 								|  Arquivos de memória |
| `├── node_modules` 						| 
| `├── prisma/` 									|  Configuração do banco |
| `├── public/` 									|  Arquivos estáticos |
| `├── scripts/` 									| 
| `├── tmp/` 										|
| `├── utils/` 										|
| `├── gfauto-repo/` 							|
| `├── MEMORIADESESSAO.md` 	| 
| `├── Projeto_GFauto.md` 				| 

### **📁 MÓDULOS/FLUXOS**
| **Existente** | **Ideal + Comentários** |
|---------------|-------------------------|
| `├── fluxo_app/` 								| 
| `├── fluxo_cliente_anunciante/` 		| 
| `├── fluxo_pag_de_resultados/` 		| 
| `├── fluxo_pagto/` 							| 
| `├── fluxo_painel_admin/` 				| 
| `├── fluxo_plano/` 							| 
| `├── fluxo_visitante/` 						| 

### **📁 ESTRUTURA DO FLUXO_APP (DETALHADA)**
| **Existente** | **Ideal + Comentários** |

| `fluxo_app/` 										|  
| `├── components/` 							|  
| `├── styles/` 									|  
| `├── types/` 									| Para definições TypeScript específicas
| `├── utils/`     									| Para utilitários específicos do fluxo |
| `├── README_fluxo_app.md` 		|  

| `fluxo_plano/` 									|  
| `├── components/` 							|  
| `├── styles/` 									|  
| `├── types/` 									| Para definições TypeScript específicas
| `├── utils/`     									| Para utilitários específicos do fluxo |
| `├── README_fluxo_plano.md` 	|  

### **📁 ESTRUTURA DE IMAGENS**
| **Existente** | **Ideal + Comentários** |

| `public/fluxo_app/images/`				| Localização principal |
| `├── image001.jpg` 						| Moto Azul |
| `├── image003.jpg` 						| Carro Vermelho |
| `├── image005.jpg` 						| SUV Branca |
| `├── logo.png` 								| Logo GFauto
| `├── mc4.png` 								| Mascote Manda Chuva |

| `public/fluxo_plano/images/`				| Localização principal |
| `├── carrao.jpg` 								| arte anúncio "Auto Peças Carrão" |
| `├── logo_gf.png` 							| Logo GF |
| `├── mas.jpg` 									| arte anúncio "Mas Auto Peças" |
| `├── mc4.png` 								| Mascote Manda Chuva |

### **📁 ESTRUTURA IDEAL PARA OUTROS FLUXOS**
| **Padrão Recomendado** 				| **Comentários** |

| `fluxo_[nome]/` 									| **Estrutura padrão para todos os fluxos** |
| `├── components/` 							| Componentes específicos do fluxo |
| `├── styles/` 									| Estilos específicos do fluxo |
| `├── types/` 									| Definições TypeScript |
| `├── utils/` 										| Utilitários específicos |
| `├── README_fluxo_[nome].md` 	| Documentação obrigatória |

---



### **🟢 BAIXA PRIORIDADE:**
6. **Criar documentação de estrutura padrão**
7. **Implementar checklist de estrutura para novos fluxos**

