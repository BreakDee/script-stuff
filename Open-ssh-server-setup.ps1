# Create a new admin user with the name "admin" and password "P@§§W0RD"
$Username = "admin"
$Password = ConvertTo-SecureString "P@§§W0RD" -AsPlainText -Force
$User = New-LocalUser -Name $Username -Password $Password -Description "Administrator account"
Add-LocalGroupMember -Group "Administrators" -Member $User.Name

# Enable OpenSSH server
Get-WindowsCapability -Name OpenSSH.Server* -Online | Add-WindowsCapability -Online

# Disable password authentication for OpenSSH
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name "PasswordAuthentication" -Value "no" -PropertyType "String" -Force | Out-Null
Restart-Service ssh-agent

# Write the IP address of the computer to a file on the USB drive
$Drive = Get-WMIObject Win32_LogicalDisk | Where-Object { $_.VolumeName -eq "LL" }
$IP = (Test-Connection -ComputerName $env:computername -Count 1).IPV4Address.IPAddressToString
Out-File -FilePath "$($Drive.DeviceID)\IPAddress.txt" -InputObject $IP -Encoding UTF8
