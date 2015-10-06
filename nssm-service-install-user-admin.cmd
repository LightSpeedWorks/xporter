@pushd %~dp0
@call nssm-set-svc-app-name
@set USERNAME=yourname@your.domain.group
@set PASSWORD=WRITE-ONCE-MANUALLY
%NSSM% install %SVC% %APP%
sc config %SVC% obj= %USERNAME% password= %PASSWORD%
@popd
@pause
