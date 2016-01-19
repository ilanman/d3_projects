library(RJSONIO)
data<-read.csv('student.csv')

## clean data
data$low<-ifelse(data$GPA<2.5,2,1)
data$med<-ifelse(data$GPA<3.5&data[,1]>=2.5,2,1)
data$high<-ifelse(data$GPA>=3.5,2,1)
data<-data[,-1]
data$FakeID<-as.numeric(data$FakeID)
data$ChtdSO<-as.numeric(data$ChtdSO)
data$SmokeCig<-as.numeric(data$SmokeCig)
data$SmokedMJ<-as.numeric(data$SmokedMJ)
data$ChtdExam<-as.numeric(data$ChtdExam)
data$SkipClass<-ifelse(data$SkipClass<1,0,data$SkipClass)

## create links json out of correlations between groups
cor.data<-data.frame(cor(data))
temp<-cor.data[upper.tri(cor.data)]
d<-data.frame(temp)[-c(35,36,28),]
upper<-(d-min(d))/(max(d)-min(d))

## if this list was longer, I would have automated this
links<-list(c(cor=upper[1],source=0, target=1),
           c(cor=upper[2],source=0, target=2),
           c(cor=upper[3],source=1,target= 2),
           c(cor=upper[4],source=0, target=3),
           c(cor=upper[5],source=1,target= 3),
           c(cor=upper[6],source=2,target= 3),        
           c(cor=upper[7],source=0,target= 4),
           c(cor=upper[8],source=1, target=4),
           c(cor=upper[9],source=2,target= 4),
           c(cor=upper[10],source=3, target=4),
           c(cor=upper[11],source=0,target= 5),
           c(cor=upper[12],source=1, target=5),
           c(cor=upper[13],source=2,target= 5),
           c(cor=upper[14],source=3, target=5),
           c(cor=upper[15],source=4,target= 5),
            c(cor=upper[16],source=0,target= 6),
            c(cor=upper[17],source=1, target=6),
            c(cor=upper[18],source=2,target= 6),
            c(cor=upper[19],source=3, target=6),
            c(cor=upper[20],source=4,target= 6),
            c(cor=upper[21],source=5,target= 6),
            c(cor=upper[22],source=0,target= 7),
            c(cor=upper[23],source=1, target=7),
            c(cor=upper[24],source=2,target= 7),
            c(cor=upper[25],source=3, target=7),
            c(cor=upper[26],source=4,target= 7),
            c(cor=upper[27],source=5,target= 7),   
            c(cor=upper[28],source=0,target= 8),
            c(cor=upper[29],source=1, target=8),
            c(cor=upper[30],source=2,target= 8),
            c(cor=upper[31],source=3, target=8),
            c(cor=upper[32],source=4,target= 8),
            c(cor=upper[33],source=5,target= 8))

json<-toJSON(links,.escapeEscapes=FALSE,pretty=TRUE)
write.table(json,file='links.txt')

## create nodes size
count.data<-apply(data,2,function(x){ifelse(x>1,1,0)})
size<-apply(count.data,2,sum)

nodes<-list()
for (i in c(1:length(size))){
  row<-list(c(group=names(size)[i],size=size[[i]]))
  nodes<-append(nodes,row)
}

json<-toJSON(nodes,.escapeEscapes=FALSE,pretty=TRUE)
write.table(json,file='nodes.txt')
