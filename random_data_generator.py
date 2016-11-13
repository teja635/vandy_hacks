import random

def gen_rand():
    return random.randrange(0, 25)

def gen_rand_arr():
    a = []
    a.append(gen_rand())
    a.append(gen_rand()+a[-1])
    a.append(gen_rand()+a[-1])
    a.append(gen_rand()+(a[-1]*3))
    a.append(gen_rand()+(a[-1]*3))
    for i in range(len(a)):
        a[i] = str(a[i])
    return a

k = []
for r in range(30):
    for c in range(30):
        f = gen_rand_arr()
        s = gen_rand_arr()
        k.append("{'x': " + str(r) + ",'y': " + str(c) + ",'time': {'one': "+f[0]+",'two': "+f[1]+",'three': "+f[2]+",'week': "+f[3]+",'month': "+f[4]+"},'pollen_time': {'one': "+s[0]+",'two': "+s[1]+",'three': "+s[2]+",'week': "+s[3]+",'month': "+s[4]+"}}")
print str(k).replace('\"', '')
  