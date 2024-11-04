import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score

# Transformin csv in DataFrame
df = pd.read_csv('milknew.csv')

# Missing values
df.isnull()
df = df.fillna(0)
print(df.tail())

### Descriptive analytics
# Statistics
descriptive = df.describe()
count = round(descriptive.iloc[0][descriptive.columns[1]])
print(f'Number of instances: {count}')
descriptive.drop('count', inplace=True)
print(descriptive)

# Boxplots
df.index.name = 'Dia'
descriptive_plot = descriptive[['pH', 'Temprature', 'Colour']]
descriptive_plot.boxplot()
plt.show()

# Univariate data visualization
len = df.shape[1]
columns = []
for i in range(len):
    columns.append(df.columns[i])
for column in columns:
    plt.figure(figsize=(3, 3))
    sns.histplot(df[column], bins=30, kde=False)
    plt.title(column)
    plt.show()