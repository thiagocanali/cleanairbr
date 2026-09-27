# cleanairbr

Quero transformar o projeto atual da empresa do meu pai, Clean Air, em um sistema web completo para ajudá-lo a administrar a empresa de manutenção e limpeza de ar-condicionado.

O projeto atual está neste repositório:

https://github.com/thiagocanali/cleanairbr

Primeiro, analise completamente o projeto existente antes de fazer qualquer alteração.

Não quero simplesmente criar outro projeto do zero. Quero aproveitar ao máximo o que já existe, mantendo a identidade visual e o site público atual, mas adicionando uma área administrativa/profissional para o dono da empresa.

Contexto da empresa
Meu pai trabalha sozinho com manutenção, limpeza e serviços de ar-condicionado.

A empresa existe desde aproximadamente 2014/2015, mas ainda é uma operação pequena e muito dependente dele.

Atualmente ele controla praticamente tudo com papel e caneta:

agenda de clientes;

dados dos clientes;

informações dos aparelhos;

informações coletadas antes da manutenção;

informações coletadas depois da manutenção;

histórico dos serviços;

quando deve voltar a entrar em contato com o cliente;

observações;

informações sobre os equipamentos.

Quero transformar isso em um sistema simples, rápido e extremamente útil para ele.

A prioridade NÃO é criar um software empresarial gigante.

A prioridade é criar algo que um profissional que trabalha sozinho consiga abrir no celular e usar durante o atendimento sem perder tempo.

OBJETIVO PRINCIPAL
Quero que o sistema seja uma mistura de:

CRM;

agenda;

cadastro de clientes;

cadastro de equipamentos;

histórico de manutenção;

lembretes de manutenção futura;

registro técnico dos serviços;

geração de relatório para o cliente;

comunicação com o cliente.

Tudo em uma interface simples.

1. ÁREA PÚBLICA
Manter o site público atual da Clean Air funcionando.

Quero que o site continue sendo a vitrine da empresa.

Avalie o site atual e preserve o que já funciona.

Se fizer sentido, melhorar:

apresentação da empresa;

serviços;

diferenciais;

formulário de contato/orçamento;

botão de WhatsApp;

chamadas para orçamento;

SEO básico;

versão mobile;

velocidade;

acessibilidade.

Não faça mudanças visuais grandes sem necessidade.

2. ÁREA ADMINISTRATIVA
Criar uma área protegida por login.

Exemplo:

/admin

ou uma estrutura equivalente adequada à tecnologia atual.

O dono deverá conseguir acessar pelo celular, tablet ou computador.

A interface deve ser extremamente simples.

Depois do login, mostrar um dashboard.

3. DASHBOARD
O dashboard deve mostrar rapidamente:

serviços de hoje;

próximos serviços;

clientes que precisam de contato;

manutenções atrasadas;

clientes próximos de completar 1 ano desde a última manutenção;

orçamentos pendentes;

serviços concluídos recentemente;

faturamento, se houver dados suficientes;

quantidade de clientes;

quantidade de equipamentos cadastrados.

Exemplo:

"Hoje"

09:00 — João Silva — Limpeza — 2 aparelhos

14:00 — Maria Souza — Manutenção — 1 aparelho

4. CLIENTES
Criar cadastro completo de clientes.

Campos sugeridos:

nome;

telefone;

WhatsApp;

e-mail;

CPF/CNPJ opcional;

endereço;

número;

complemento;

bairro;

cidade;

estado;

CEP;

observações;

data do primeiro atendimento;

origem do cliente;

status do cliente.

Um cliente pode possuir vários aparelhos.

Exemplo:

João Silva

├── Split LG 9.000 BTUs
├── Split Samsung 12.000 BTUs
└── Split Daikin 18.000 BTUs

5. EQUIPAMENTOS
Cada equipamento precisa ter seu próprio histórico.

Informações possíveis:

cliente;

ambiente;

marca;

modelo;

capacidade BTU;

tipo;

número de série;

tensão;

ano aproximado;

observações;

localização do equipamento;

última manutenção;

próxima manutenção recomendada.

O sistema deve permitir visualizar todo o histórico daquele equipamento.

6. ORDEM DE SERVIÇO
Criar uma ordem de serviço para cada atendimento.

Ela deve permitir registrar:

Antes da manutenção
Exemplos:

temperatura de entrada;

temperatura de saída;

diferença de temperatura;

corrente elétrica;

tensão;

pressão;

estado dos filtros;

estado da evaporadora;

estado da condensadora;

sujeira;

sinais de vazamento;

ruídos;

observações;

fotos.

Serviço realizado
Permitir selecionar ou escrever:

limpeza;

higienização;

manutenção preventiva;

manutenção corretiva;

limpeza de filtros;

limpeza de evaporadora;

limpeza de condensadora;

verificação elétrica;

verificação de gás;

drenagem;

outros.

Também permitir escrever observações personalizadas.

Depois da manutenção
Registrar novamente os dados relevantes:

temperatura de entrada;

temperatura de saída;

diferença de temperatura;

corrente;

tensão;

pressão;

observações;

fotos.

A ideia é conseguir mostrar para o cliente:

ANTES
Temperatura de saída: X°C

DEPOIS
Temperatura de saída: Y°C

E explicar de maneira visual a melhoria encontrada após o serviço.

7. RELATÓRIO PARA O CLIENTE
Essa é uma funcionalidade muito importante.

Depois que o serviço for concluído, o sistema deve conseguir gerar um relatório bonito e profissional.

O relatório deve conter:

logo da empresa;

nome da empresa;

dados do cliente;

endereço;

data do serviço;

equipamento;

tipo de serviço;

técnico responsável;

dados antes;

dados depois;

comparação;

observações;

serviços realizados;

recomendações;

fotos antes/depois, quando existirem;

próxima manutenção recomendada.

Exemplo visual:

ANTES DEPOIS

Temperatura Temperatura
18°C 11°C

Corrente Corrente
X A Y A

Também pode haver indicadores visuais de melhoria.

O relatório deve poder ser:

visualizado no navegador;

baixado como PDF;

enviado para o cliente por e-mail;

compartilhado por WhatsApp através de um link.

Não inventar métricas de melhoria.

Só calcular diferenças quando houver dados válidos.

8. LEMBRETES DE MANUTENÇÃO
Essa é uma das funcionalidades mais importantes do sistema.

Quando um serviço for concluído, registrar a data da manutenção.

Por padrão, criar uma próxima manutenção sugerida para aproximadamente 1 ano depois.

Exemplo:

Serviço realizado:
15/09/2026

Próximo contato sugerido:
15/09/2027

O sistema deve avisar o dono quando estiver chegando a hora.

Por exemplo:

"5 clientes precisam de contato esta semana."

"João Silva — última manutenção há 11 meses."

"Maria Souza — manutenção vence em 12 dias."

Permitir configurar o intervalo, pois nem todo equipamento precisa de exatamente 1 ano.

9. FOLLOW-UP DOS CLIENTES
Criar uma área:

"Clientes para entrar em contato"

Cada cliente pode ter status:

aguardando contato;

contato realizado;

cliente respondeu;

agendado;

não tem interesse;

tentar novamente;

manutenção realizada.

Permitir registrar observações do contato.

Exemplo:

"Cliente disse que vai verificar com a esposa e responder amanhã."

O sistema pode então criar um lembrete.

10. WHATSAPP
Não precisa criar integração complexa inicialmente.

Criar botões que abram o WhatsApp com mensagens pré-preenchidas.

Exemplo:

"Olá, João! Tudo bem? Aqui é da Clean Air. Estamos entrando em contato porque está próximo do período recomendado para uma nova manutenção do seu ar-condicionado. Gostaria de agendar uma visita?"

O sistema deve gerar a mensagem automaticamente usando os dados do cliente.

11. E-MAIL
Permitir enviar o relatório do serviço para o cliente.

Exemplo:

Assunto:

"Relatório de manutenção — Clean Air"

Corpo:

Olá, João.

Obrigado por confiar na Clean Air.

Segue o relatório referente à manutenção realizada em seu equipamento.

[Visualizar relatório]

Atenciosamente,
Clean Air

Usar uma solução adequada para envio de e-mail em produção.

Não deixar credenciais ou chaves de API expostas no frontend.

12. AGENDA
Criar uma agenda visual.

Visualizações:

dia;

semana;

mês.

Cada serviço deve mostrar:

horário;

cliente;

endereço;

serviço;

quantidade de equipamentos;

status.

Status:

agendado;

confirmado;

em andamento;

concluído;

cancelado;

reagendar.

Permitir clicar no evento e abrir todos os dados do atendimento.

13. FLUXO IDEAL DE UM ATENDIMENTO
Quero que você pense no sistema baseado neste fluxo:

Meu pai recebe uma ligação ou mensagem.

Ele abre o sistema.

Procura o cliente.

Se o cliente não existir, cadastra rapidamente.

Escolhe o equipamento existente ou cadastra um novo.

Agenda o atendimento.

No dia do atendimento, abre a ordem de serviço pelo celular.

Registra os dados antes da manutenção.

Realiza o serviço.

Registra os dados depois.

Adiciona fotos.

Marca o serviço como concluído.

O sistema gera o relatório.

Ele envia o relatório para o cliente.

O sistema agenda automaticamente um lembrete para o próximo contato.

Aproximadamente um ano depois, o sistema avisa:
"Está na hora de entrar em contato com João."

Meu pai clica em WhatsApp.

O sistema abre uma mensagem pronta.

Ele entra em contato e agenda novamente.

Esse ciclo é o coração do sistema.

14. HISTÓRICO DO CLIENTE
Ao abrir um cliente, quero enxergar uma timeline.

Exemplo:

JOÃO SILVA

15/09/2026
Manutenção preventiva
2 equipamentos
Relatório enviado

20/09/2025
Limpeza
2 equipamentos
Relatório enviado

12/03/2025
Manutenção corretiva
1 equipamento

Isso deve permitir entender rapidamente o relacionamento com aquele cliente.

15. FOTOS
Permitir adicionar fotos durante a ordem de serviço.

Categorias:

antes;

durante;

depois;

equipamento;

problema encontrado.

As imagens precisam ser armazenadas em uma solução apropriada para produção.

Não armazenar arquivos grandes diretamente no banco de dados.

16. ORÇAMENTOS
Se fizer sentido arquiteturalmente, criar uma área simples de orçamento.

Um orçamento pode conter:

cliente;

equipamentos;

serviços;

peças;

quantidade;

preço;

desconto;

valor total;

observações;

validade;

status.

Status:

rascunho;

enviado;

aprovado;

recusado;

expirado.

No futuro, isso pode evoluir para aprovação digital.

17. FINANCEIRO
Não quero transformar isso inicialmente em um sistema contábil.

Mas seria interessante registrar:

valor do serviço;

forma de pagamento;

status do pagamento;

valor recebido;

data.

Dashboard:

faturamento do mês;

serviços realizados;

serviços pendentes de pagamento.

Essa parte deve ser simples.

18. BUSCA GLOBAL
Criar uma busca rápida para procurar:

clientes;

telefone;

endereço;

equipamento;

ordem de serviço;

número da OS.

Meu pai precisa conseguir encontrar um cliente rapidamente.

19. EXPERIÊNCIA MOBILE
Essa é uma prioridade.

Meu pai provavelmente vai usar o sistema principalmente no celular durante os atendimentos.

Portanto:

botões grandes;

formulários fáceis;

poucos campos por tela;

navegação simples;

carregamento rápido;

evitar tabelas impossíveis de usar no celular;

câmera acessível para fotos;

botão de WhatsApp;

botão de telefone;

botão de mapa/endereço.

Pense como se o usuário estivesse dentro da casa do cliente, em pé, usando o celular com uma mão.

20. TECNOLOGIA E ARQUITETURA
Antes de implementar:

Analise a stack atual do repositório.

Identifique framework.

Identifique banco, se existir.

Identifique estrutura de páginas.

Identifique componentes reutilizáveis.

Identifique como o projeto está sendo hospedado atualmente.

Identifique o que pode ser aproveitado.

Quero colocar o projeto na Vercel.

Escolha uma arquitetura compatível com Vercel e adequada para produção.

Se precisar de banco de dados, autenticação, storage de imagens, e-mail ou outros serviços, escolha soluções modernas, simples e de baixo custo.

Priorize:

simplicidade;

segurança;

baixo custo;

facilidade de manutenção;

escalabilidade razoável;

boa experiência mobile.

Não adicionar tecnologias apenas porque são populares.

21. BANCO DE DADOS
Modele corretamente os relacionamentos.

Conceitualmente teremos algo próximo de:

User
Customer
Address
Equipment
ServiceOrder
ServiceOrderEquipment
Measurement
Photo
Appointment
Quote
Payment
Reminder
Communication
Report

Mas você deve adaptar isso à stack existente.

Não duplicar informações desnecessariamente.

Um cliente pode possuir vários equipamentos.

Um atendimento pode envolver vários equipamentos.

Um equipamento possui vários atendimentos ao longo do tempo.

22. AUTENTICAÇÃO E SEGURANÇA
Criar autenticação segura.

Inicialmente pode existir apenas um usuário administrador, mas a arquitetura não deve impedir adicionar técnicos no futuro.

Nunca:

armazenar senha em texto puro;

expor secrets no frontend;

colocar chaves privadas no GitHub;

confiar apenas em proteção visual das rotas.

Validar permissões no backend/server-side.

Validar dados recebidos pelo servidor.

23. PRIVACIDADE / LGPD
O sistema terá dados pessoais de clientes.

Considerar princípios básicos da LGPD:

coletar somente dados necessários;

proteger informações;

não expor dados de clientes publicamente;

evitar URLs públicas previsíveis para relatórios;

proteger documentos;

permitir exclusão de clientes quando apropriado;

não colocar informações sensíveis em logs.

24. RELATÓRIO COMO DIFERENCIAL DA EMPRESA
Quero que você pense também no aspecto comercial.

O sistema não deve ser apenas uma agenda.

Quero que a Clean Air consiga transmitir uma imagem muito mais profissional.

Depois de cada atendimento, o cliente deve receber algo parecido com:

"Seu atendimento foi concluído."

E então:

equipamento;

problema identificado;

serviço realizado;

medições;

comparação antes/depois;

fotos;

recomendações;

próxima manutenção.

Isso cria histórico e mostra profissionalismo.

25. INTELIGÊNCIA DO SISTEMA
No futuro, o sistema pode identificar oportunidades.

Exemplos:

"12 clientes não recebem manutenção há mais de 12 meses."

"5 clientes possuem equipamentos que precisam de nova avaliação."

"3 clientes possuem orçamento enviado e ainda não responderam."

"João possui 3 equipamentos e apenas 2 foram atendidos neste ano."

"Maria está há 14 meses sem manutenção."

Não tomar decisões automaticamente pelo usuário.

Mostrar informações e sugestões para que ele decida.

26. AUTOMAÇÕES FUTURAS
Estruture o sistema para futuramente suportar:

lembretes automáticos;

WhatsApp automatizado;

e-mail automático;

confirmação de agendamento;

lembrete de visita;

lembrete de manutenção anual;

pesquisa de satisfação;

pedido de avaliação no Google;

campanhas para clientes antigos;

relatórios automáticos.

Mas NÃO implemente tudo de uma vez.

Primeiro construa uma base sólida.

27. PRIORIDADE DE IMPLEMENTAÇÃO
Quero que você organize a implementação em fases.

FASE 1 — Base
deploy na Vercel;

banco de dados;

autenticação;

área administrativa;

clientes;

equipamentos;

agenda;

ordens de serviço.

FASE 2 — Operação
medições antes/depois;

fotos;

histórico;

lembretes;

dashboard;

busca;

WhatsApp.

FASE 3 — Experiência do cliente
geração de relatório;

PDF;

envio por e-mail;

página pública segura do relatório;

compartilhamento.

FASE 4 — Gestão
orçamentos;

pagamentos;

indicadores;

relatórios administrativos.

FASE 5 — Automação
lembretes automáticos;

e-mails automáticos;

integrações;

pesquisa de satisfação;

outras automações.

28. IMPORTANTE: NÃO SUPERCOMPLICAR
Meu pai não é usuário técnico.

Se uma tela tiver 30 campos, provavelmente ele não vai usar.

Prefira:

defaults inteligentes;

campos opcionais;

seleção rápida;

autocomplete;

dados reaproveitados;

preenchimento automático;

poucos cliques;

histórico automático.

Se ele já cadastrou um equipamento anteriormente, não quero obrigá-lo a digitar novamente marca, modelo, BTUs etc.

29. DASHBOARD PENSADO PARA O DONO
Ao entrar no sistema, quero que ele imediatamente saiba:

"Tenho o quê para fazer hoje?"

E:

"Quem preciso contatar?"

E:

"Quanto tenho para receber?"

E:

"Quais clientes estão sumindo?"

Não quero um dashboard cheio de gráficos inúteis.

Priorize ações.

30. QUALIDADE DO CÓDIGO
Antes de implementar qualquer coisa:

analise o código existente;

mantenha padrões existentes quando forem bons;

refatore apenas quando necessário;

não quebre funcionalidades existentes;

mantenha componentes reutilizáveis;

mantenha tipagem forte;

trate erros;

valide formulários;

trate estados de loading;

trate estados vazios;

trate erros de rede;

seja cuidadoso com mobile.

Não faça mudanças gigantescas sem necessidade.

31. ENVIRONMENT VARIABLES
Documente claramente todas as variáveis necessárias.

Criar/atualizar:

.env.example

Nunca colocar secrets reais no repositório.

Explicar quais variáveis precisam ser configuradas na Vercel.

32. DEPLOY
Quero que o projeto fique preparado para deploy na Vercel.

Verifique:

build;

variáveis de ambiente;

rotas;

banco;

storage;

autenticação;

domínio;

HTTPS;

produção.

Criar documentação clara explicando como colocar o projeto em produção.

33. DOCUMENTAÇÃO
Criar/atualizar README explicando:

arquitetura;

stack;

instalação;

desenvolvimento local;

banco de dados;

migrations;

variáveis de ambiente;

autenticação;

storage;

e-mail;

deploy na Vercel;

como criar o primeiro administrador.

34. FORMA DE TRABALHAR
Não saia implementando tudo de uma vez.

Primeiro:

Analise o repositório.

Entenda a arquitetura atual.

Faça um diagnóstico.

Identifique o que já existe.

Identifique o que precisa ser criado.

Proponha a arquitetura.

Proponha o modelo de dados.

Divida em pequenas etapas.

Só então comece a implementar.

Depois de cada etapa importante:

rode os testes;

verifique o build;

procure regressões;

corrija problemas;

mantenha o projeto executável.

Sempre prefira uma implementação simples e funcional a uma arquitetura excessivamente sofisticada.

35. VISÃO DE PRODUTO
Não pense apenas como programador.

Pense:

"Se eu fosse o dono dessa empresa e trabalhasse sozinho, o que me faria economizar tempo?"

"Que informação eu gostaria de ter quando estou na casa do cliente?"

"O que faria o cliente perceber que essa empresa é profissional?"

"O que faria o cliente lembrar da Clean Air daqui a um ano?"

"O que ajudaria o dono a não perder clientes antigos?"

"O que pode transformar um serviço pontual em relacionamento recorrente?"

O objetivo final é criar uma ferramenta que ajude uma pequena empresa de manutenção de ar-condicionado a trabalhar de forma mais organizada, profissional e recorrente.

Não quero construir um SaaS genérico.

Quero construir uma ferramenta sob medida para a operação real da Clean Air.

Comece analisando o repositório atual e me entregue primeiro um diagnóstico técnico e uma proposta de arquitetura antes de alterar o código.

Uma coisa que eu acrescentaria
Tem uma ideia particularmente boa no que você descreveu: o equipamento, e não apenas o cliente, deveria ser o centro do histórico técnico.

Seu pai poderia abrir:

Cliente: João
3 aparelhos cadastrados

Split LG 12.000 BTUs — Sala

última limpeza: 15/09/2026

próxima revisão: 15/09/2027

histórico: 4 atendimentos

temperatura antes/depois

fotos

peças trocadas

observações

Isso transforma o conhecimento que hoje está perdido em papel em um histórico permanente daquele ar-condicionado.

E, comercialmente, existe outra possibilidade interessante: depois de alguns anos vocês podem ter um sistema que mostre algo como “clientes que não compram há 12+ meses”, permitindo que seu pai trabalhe a própria carteira antiga em vez de depender somente de novos clientes.
